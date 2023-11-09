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
    .then(response => {
        if (!response.ok){
            throw new Error('Network response failed');
        }
        return response.json();
    })
    .then(data =>{
        updateForecast(data);
    })
    .catch(error => console.error('Error:', error));
}

function updateCurrentWeather(currentWeatherData){

    var temperatureFahrenheit = Math.round((currentWeatherData.main.temp - 273.15) * 9/5 + 32); // Converting Kelvin to Fahrenheit

    // Displaying the temperature in Fahrenheit
    document.querySelector('.temp').textContent = `Temperature: ${temperatureFahrenheit}°F`;
    //Displaying wind speed
    document.querySelector('.wind').textContent = `Wind speed: ${data.wind.speed} m/s`;
    // Displaying humidity
    document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`; 

    // Assigning weather icon to their respective image
    var weatherIconCode = data.weather[0].icon;
    var weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
    document.getElementById('weatherIcon').src = weatherIconURL;

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
}

function updateForecast(data){
    var forecastElements = document.querySelectorAll('.day');

    for (let i = 0; i < forecastElements.length; i++){
        var forecastData = data.list[i * 8];
        var date = new Date(forecastData.dt * 1000);
        var temperature = Math.round((forecastData.main.temp - 273.15) * 9/5 + 32);

        forecastElements[i].querySelector('.date-fc').textContent = date.toLocaleDateString();
        forecastElements[i].querySelector('.temp-fc').textContent = `Temperature: ${temperature}°F`;
        forecastElements[i].querySelector('.wind-fc').textContent = `Wind Speed: ${forecastData.wind.speed} m/s`;
        forecastElements[i].querySelector('.humidity-fc').textContent = `Humidity: ${forecastData.main.humidity}`;

        var iconCode = forecastData.weather[0].icon;
        var iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;
        forecastElements[i].querySelector('.weather-fc').src = iconURL;
    }
}