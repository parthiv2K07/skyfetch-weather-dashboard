// Your OpenWeatherMap API Key
const API_KEY = '4677a91645b17cd83362b5487d9df201';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
// Convert this function to async/await
async function getWeather(city) {
    showLoading();

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // Disable search button
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {
        showError("❌ Could not fetch weather data.");

    } finally {
        // Re-enable button
        searchBtn.disabled = false;
        searchBtn.textContent = "🔍 Search";
    }
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
    cityInput.focus();

}
// Create showError function
function showError(message) {

    // Create HTML for error message
    const errorHTML = `
        <div class="error-message" style="color:#fff; background:#ff6b6b; padding:20px; border-radius:10px; text-align:center;">
            <h3>⚠️ Error</h3>
            <p>${message || "Something went wrong. Please try again."}</p>
        </div>
    `;

    // Display in #weather-display div
    document.getElementById('weather-display').innerHTML = errorHTML;
}
// Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Add click event listener to search button
searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    // 1️⃣ Check if input is empty or only spaces
    if (!city) {
        showError("⚠️ Please enter a city name");
        return;
    }

    // 2️⃣ Check minimum length
    if (city.length < 2) {
        showError("⚠️ City name too short");
        return;
    }

    // 3️⃣ If valid, proceed with search
    getWeather(city);
});

// BONUS: Add enter key support
cityInput.addEventListener("keypress", function (event) {
    // Check if Enter key was pressed
    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city === "") {
            showError("⚠️ Please enter a city name.");
            return;
        }

        // Trigger the same search logic
        getWeather(city);
    }
});
// Create showLoading function
function showLoading() {

    // Create loading HTML
    const loadingHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;

    // Display in #weather-display
    document.getElementById("weather-display").innerHTML = loadingHTML;
}
// Show welcome message when page loads
document.getElementById("weather-display").innerHTML = `
    <div class="welcome-message">
        <h2>🌤️ Weather App</h2>
        <p>Enter a city name above to check the current weather.</p>
    </div>
`;