var weatherIcons = {
    'Clear': 'sunny.png',
    'Rain': 'rainy.png',
    'Clouds': 'cloudy.png',
    'Snow': 'snowy.png'
};

document.getElementById('searchBtn').addEventListener('click', function(event){
    event.preventDefault();
    var city = document.getElementById('searchInput').value;
    getWeather(city);
});

function getWeather(city) {
    var key = 'b728fddd61a439b11308f921ea4b2e2f';
    var API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key;


    // Fetch current weather
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // Updating the weather UI
        updateCurrentWeather(data);
        // Fetching the 5 day forecast
        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key);
    })
    .then(response => response.json())
    .then(data => {
        // Updating the 5 day forecast UI 
        updateForecast(data);
    })
    .catch(error => console.error('Error', error));
}

function updateCurrentWeather(data){
    var temperatureDefault = data.main.temp; // The default temperature measurement is in Kelvin, will have to convert
    var temperatureFahrenheit = Math.round((temperatureDefault - 273.15) * 9/5 + 32); // Converting Kelvin to Fahrenheit

    // Displaying the temperature in Fahrenheit
    document.querySelector('.temp').textContent = `Temperature: ${temperatureFahrenheit}°F`;
    //Displaying wind speed
    document.querySelector('.wind').textContent = `Wind speed: ${data.wind.speed} m/s`;
    // Displaying humidity
    document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`; 

    // Assigning weather icon to their respective image
    var weatherIconCode = data.weather[0].icon;
    var weatherIconURL = `./assets/images/${weatherIconCode}.png`;
    document.getElementById('weatherIcon').src = weatherIconURL;

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
}