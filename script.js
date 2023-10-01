// Define a function to fetch weather data
function getWeatherData() {
    // Replace 'YOUR_API_KEY' with your actual API key
    var apiKey = '77ea4d1bad3baf1c704ab1035099e3c0';
    // var city = 'New York'; // Replace with the desired city
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=42.7284&lon=-73.6918&appid=' + apiKey;
    // city + '&appid=' + apiKey;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Call another function to parse and display the weather information
            getInfo(data);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

// Define a function to fetch air quality data from the OpenAQ API
function getAirQualityData() {
    // var city = 'New York'; // Replace with the desired city or location
    // var country = 'US'; // Replace with the desired country code (ISO 3166-1 alpha-2)
    // var apiUrl = `https://api.openaq.org/v2/measurements?coordinates=42.7284,-73.6918`;
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.openaq.org/v2/cities?city=Chicagopage=1&offset=0&sort=asc&order_by=city',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    $.ajax({
        url: settings,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Call a function to parse and display air quality data
            displayAirQuality(data);
        },
        error: function(error) {
            console.error('Error fetching air quality data:', error);
        }
    });
}

// Define a function to parse and display air quality data
function displayAirQuality(data) {
    // Check if there is data available for the requested location
    if (data.results.length > 0) {
        var airQuality = data.results[0];
        var city = airQuality.city;
        var country = airQuality.country;
        var location = `${city}, ${country}`;
        var aqi = airQuality.measurements[0].value;
        var parameter = airQuality.measurements[0].parameter;

        var airQualityInfo = `
            <h2>Air Quality in ${location}</h2>
            <p>Parameter: ${parameter}</p>
            <p>Air Quality Index (AQI): ${aqi}</p>
        `;

        $('#weather-info').append(airQualityInfo);
    } else {
        console.error('No air quality data available for the requested location.');
    }
}

// Call the getAirQualityData function to fetch air quality data when the document is ready
$(document).ready(function() {
    getAirQualityData();
});



// Define a function to parse and display weather information
// Define a function to parse and display weather information
function getInfo(data) {
    var city = data.name;
    var temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
    var feelsLike = (data.main.feels_like - 273.15).toFixed(2);
    var condition = data.weather[0].description;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var windDirection = data.wind.deg;
    var pressure = data.main.pressure;
    var visibility = data.visibility;
    var sunriseTime = new Date(data.sys.sunrise * 1000); // Convert Unix timestamp to a JavaScript date
    var sunsetTime = new Date(data.sys.sunset * 1000);
    var weatherIcon = data.weather[0].icon;
    var weatherId = data.weather[0].id;

    var weatherInfo = `
        <h2>${city} Weather</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels Like: ${feelsLike}°C</p>
        <p>Condition: ${condition}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Wind Direction: ${windDirection}°</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Visibility: ${visibility} meters</p>
        <p>Sunrise Time: ${sunriseTime.toLocaleTimeString()}</p>
        <p>Sunset Time: ${sunsetTime.toLocaleTimeString()}</p>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p>Weather ID: ${weatherId}</p>
    `;

    $('#weather-info').html(weatherInfo);
}


// Call the function to fetch weather data when the document is ready
$(document).ready(function() {
    getWeatherData();
    getAirQualityData()
});
