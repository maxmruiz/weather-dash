$(document).ready(function() {
    $('#searchBtn').click(function(event) {
        event.preventDefault();
        getWeather($('#searchInput').val());
    });

    $('.cityList').click(function() {
        getWeather($(this).text());
    });
});

function getWeather(city) {
    var key = 'b728fddd61a439b11308f921ea4b2e2f';
    var API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key;

    // Fetching data from API
    $.ajax({
        url: API_URL,
        type: 'GET',
        dataType: 'json',
        success: updateForecast,
        error: function() {
            // Error message if input recieved is not a valid city
            $('#error-msg').text('Error: Invalid city name. Please enter a valid city name.').show();
        }
    });
}

function updateForecast(data) {
    $('#cityName').text(data.city.name);

    $('.day').each(function(index) {
        // The API data is provided every 3 hours, multiplying the index by 7 gets the data per day
        var forecastData = data.list[index * 7];
        // Converting Unix to milliseconds to use as a date variable
        var date = new Date(forecastData.dt * 1000);
        // Converting the Kelvin temperature measurement to Fahrenheit with equation
        var temperature = Math.round((forecastData.main.temp - 273.15) * 9/5 + 32);

        // Updating information of weather forecast when city is chosen
        $(this).find('.date-fc').text(date.toLocaleDateString());
        $(this).find('.temp-fc').text(`Temperature: ${temperature}°F`);
        $(this).find('.wind-fc').text(`Wind Speed: ${forecastData.wind.speed} m/s`);
        $(this).find('.humidity-fc').text(`Humidity: ${forecastData.main.humidity}%`);
        $(this).find('.weather-fc').attr('src', `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`);
    });

    // Displaying information, by default it is hidden for aesthetic purposes
    $('.current-day').show();
    $('.day-forecast').css('display', 'flex');
}
