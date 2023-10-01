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

// Define a function to fetch the NASA Earth image
function getNasaEarthImage() {
    var apiKey = 'zpDHUpCHkkb299td8sZwwnyfg9OhD94gns4uEqUF';
    var latitude = 42.7284;
    var longitude = -73.6918;
    var apiUrl = 'https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=gRIxijllJS7WRP7nZpqgjiHt4LeaRxfENOnFxlMB';
    //`https://api.nasa.gov/planetary/earth/imagery/?lon=${longitude}&lat=${latitude}&api_key=${apiKey}`;
    
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Call the insertNasaImage function and pass the NASA image URL
            insertNasaImage(data.url);
        },
        error: function(error) {
            console.error('Error fetching NASA Earth image:', error);
        }
    });
}


// Define a function to insert the NASA image into the HTML
function insertNasaImage(imageUrl) {
    if (imageUrl) {
        var nasaImage = `<img src="${imageUrl}" alt="NASA Earth Image" width="300">`;
        var b = $imageUrl;
        $('#weather-info').append(b);
    } else {
        console.error('NASA image URL is not valid.');
    }
}


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
    getNasaEarthImage();
});
