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