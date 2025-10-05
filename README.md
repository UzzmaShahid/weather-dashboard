# WeatherApp

## Overview
WeatherApp is a simple web application that allows users to check the current weather conditions for any city around the world. Users can enter a city name or use their geolocation to get weather information. The application fetches data from the OpenWeatherMap API and displays it in a user-friendly format.

## Project Structure
The project consists of the following files:

- `index.html`: The main HTML document that contains the structure of the web page, including a header, a search form for city input, and a section to display weather information.
- `style.css`: The stylesheet that defines the layout, colors, fonts, and responsive design elements for the application.
- `javascript.js`: The JavaScript file that handles fetching weather data from the **serverless API endpoint** (`/api/weather`), displaying weather information, and managing user interactions.
- `api/weather.js`: The serverless function that securely adds your OpenWeatherMap API key to requests before fetching data. This ensures the API key is never exposed in the browser.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/UzzmaShahid/weather-dashboard.git
   cd WeatherApp
   ```

2. **Install Vercel CLI** 
 ```bash
   npm install -g vercel
  ```


3. **API Key**: Set your API key in the terminal
 ```bash

# macOS/Linux
export WEATHER_API_KEY=your_openweathermap_api_key

# Windows (PowerShell)
setx WEATHER_API_KEY "your_openweathermap_api_key"

  ```
4 . **Run the app locally**
   ```bash 
   vercel dev
   ```
5 . **Open your browser** at http://localhost:3000
## Usage
- Enter a city name in the search input and click the "Get Weather" button to retrieve the current weather information for that city.
- Alternatively, click the "Use My Location" button to get the weather information based on your current geographical location.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License
This project is open-source and available under the MIT License.




