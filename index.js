const apiKey = "f00c38e0279b7bc85480c3fe775d518c"; 
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherInfo = document.getElementById("weatherInfo");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city.trim() !== "") { // Check if the input is not empty or just whitespace.
      getWeatherData(city);
    } else {
      displayError("Please enter a city name."); // Display a message if input is empty.
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  // Improved error handling
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayError("Error fetching weather data. Please check the city name and your API key."); // More specific error message
    }
}


function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const cityName = data.name; // Get the city name from the API response

    const date = new Date(); // Gets current date and time
    const formattedDate = formatDate(date); // Formats the date
    const formattedTime = formatTime(date); // Formats the time

    const weatherIconCode = data.weather[0].icon; // Get the weather icon code from the API
    const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`; // Construct the icon URL

    const weatherHtml = `
        <h2>${cityName}</h2>  
        <p>Date: ${formattedDate}</p>  <p>Time: ${formattedTime}</p>
        <img src="${weatherIconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    weatherInfo.innerHTML = weatherHtml;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Customize date format
    return date.toLocaleDateString(undefined, options); // Use locale for formatting
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }; // Customize time format (12 or 24 hour)
    return date.toLocaleTimeString(undefined, options); // Use locale for formatting
}

function displayError(message) {
  weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`; // Display error message in red
}