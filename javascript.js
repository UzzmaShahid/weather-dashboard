let weatherGrid = document.getElementById("weather-grid");
let cityInput = document.getElementById("cityInput");
let getWeatherbtn = document.getElementById("getWeatherBtn");
let myLocationBtn = document.getElementById("locationBtn");

async function getWeatherData(city) {
    try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

        if (!res.ok) {
            if (res.status === 404) {
                weatherGrid.innerHTML = `<div class="error">❌ City "${city}" not found.</div>`;
            } else if (res.status === 401) {
                weatherGrid.innerHTML = `<div class="error">⚠️ Invalid API Key.</div>`;
            } else {
                weatherGrid.innerHTML = `<div class="error">⚠️ Error: ${res.status} ${res.statusText}</div>`;
            }
            return;
        }
        const data = await res.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        let html = `<div class="weather-card current-weather">
                        <h2 id="cityName">${city}</h2>
                        <div class="temperature" id="temperature"> ${temp} °C</div>
                        <div class="weather-description" id="description">${description}</div>
                        
                        <div class="weather-details">
                            <div class="detail-item">
                                <div class="detail-label">Feels Like</div>
                                <div id="feelsLike">${feelsLike} °C</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Humidity</div>
                                <div id="humidity">${humidity} %</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Wind Speed</div>
                                <div id="windSpeed">${(windSpeed * 3.6).toFixed(2)} km/h</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Pressure</div>
                                <div id="pressure">${pressure} hPa</div>
                            </div>
                        </div>
                    </div>`;
        weatherGrid.innerHTML = html;
        console.log(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherGrid.innerHTML = `<div class="error">⚠️ Network error. Please try again later.</div>`;
    }
}

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getWeatherData(cityInput.value);
    }
});

getWeatherbtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeatherData(cityInput.value);
});

myLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Browser not supported.");
        weatherGrid.innerHTML = `<div class="error">⚠️ Browser not supported.</div>`;
    }
});

function success(pos) {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    console.log(latitude, longitude);
    getWeatherDataByUserLocation(latitude, longitude);
}

function error(e) {
    console.log("Error:", e.message);
    weatherGrid.innerHTML = `<div class="error">⚠️ ${e.message}</div>`;
}

async function getWeatherDataByUserLocation(lat, long) {
    try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${long}`);

        if (!res.ok) {
            if (res.status === 404) {
                weatherGrid.innerHTML = `<div class="error">❌ Location not found.</div>`;
            } else if (res.status === 401) {
                weatherGrid.innerHTML = `<div class="error">⚠️ Invalid API Key.</div>`;
            } else {
                weatherGrid.innerHTML = `<div class="error">⚠️ Error: ${res.status} ${res.statusText}</div>`;
            }
            return;
        }

        const data = await res.json();
        const city = data.name;
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        let html = `<div class="weather-card current-weather">
                        <h2 id="cityName">${city}</h2>
                        <div class="temperature" id="temperature"> ${temp} °C</div>
                        <div class="weather-description" id="description">${description}</div>
                        
                        <div class="weather-details">
                            <div class="detail-item">
                                <div class="detail-label">Feels Like</div>
                                <div id="feelsLike">${feelsLike} °C</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Humidity</div>
                                <div id="humidity">${humidity} %</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Wind Speed</div>
                                <div id="windSpeed">${(windSpeed * 3.6).toFixed(2)} km/h</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Pressure</div>
                                <div id="pressure">${pressure} hPa</div>
                            </div>
                        </div>
                    </div>`;
        weatherGrid.innerHTML = html;
        console.log(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherGrid.innerHTML = `<div class="error">⚠️ Network error. Please try again later.</div>`;
    }
}