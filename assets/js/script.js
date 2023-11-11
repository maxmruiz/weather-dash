$(document).ready(function(){
    $('#searchBtn').on('click', function(event){
        event.preventDefault();
        getWeather($('#searchInput').val());
    });
});

function getWeather(city){
    var key = 'b728fddd61a439b11308f921ea4b2e2f';
    var API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key;

    $.ajax({
        URL: API_URL,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            updateForecast(data);
        },
        error: function() {
            $('#error-msg').text('Error: Invalid city name. Please enter a valid city name.').show();
        }
    });
}

function updateForecast(data){
    $('#cityName').text(data.city.name);

    $('.day').each(function(index){
        var forecastData = data.list[index * 7];
        var date = new Date(forecastData.dt * 1000);
        var temperature = Math.round((forecastData.main.temp - 273.15) * 9/5 + 32);

        $(this).find('.date-fc').text(date.toLocaleDateString());
        $(this).find('.temp-fc').text(`Temperature: ${temperature}°F`);
        $(this).find('.wind-fc').text(`Wind Speed: ${forecastData.wind.speed} m/s`);
        $(this).find('.humidity-fc').text(`Humidity: ${forecastData.main.humidity}%`);

        var iconCode = forecastData.weather[0].icon;
        var iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;
        $(this).find('.weather-fc').attr('src', iconURL);
    });

    $('.current-day').show();
    $('.day-forecast').css('display', 'flex');
}
