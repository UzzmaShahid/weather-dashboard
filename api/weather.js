// api/weather.js
export default async function handler(req, res) {
  try {
    const { city, lat, lon } = req.query;

    if (!city && !(lat && lon)) {
      return res.status(400).json({ error: "Missing query params (city or lat+lon required)" });
    }

    const apiKey = process.env.WEATHER_API_KEY; // Secret API key from Vercel
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    console.error("Error in /api/weather:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
