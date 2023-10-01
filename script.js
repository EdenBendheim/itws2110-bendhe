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
}$(document).ready(function() {
    // Define a function to fetch data about a random Game of Thrones character
    function getRandomCharacter() {
        $.ajax({
            url: 'https://anapioficeandfire.com/api/characters/' + Math.floor(Math.random() * 2138), // There are 2138 characters in the API
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Call a function to display the character information
                displayCharacterInfo(data);
            },
            error: function(error) {
                console.error('Error fetching character:', error);
            }
        });
    }

    // Define a function to display character information
function displayCharacterInfo(character) {
    // Helper function to handle empty categories
    function handleEmptyCategory(category) {
        return category.trim() !== '' ? category : 'Not Available';
    }

    var characterInfo = `
        <h2>${character.name}</h2>
        <p>Gender: ${handleEmptyCategory(character.gender)}</p>
        <p>Culture: ${handleEmptyCategory(character.culture)}</p>
        <p>Aliases: ${character.aliases.length > 0 ? character.aliases.join(', ') : 'Not Available'}</p>
        <p>Born: ${handleEmptyCategory(character.born)}</p>
        <p>Died: ${handleEmptyCategory(character.died)}</p>
    `;

    $('#character-info').html(characterInfo);
}


    // Trigger the random character fetch when the document is ready
    getRandomCharacter();
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
        <p id="temp">Temperature: ${temperature}°C</p>
        <img id="image"src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p>Feels Like: ${feelsLike}°C</p>
        <p>Condition: ${condition}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Wind Direction: ${windDirection}°</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Visibility: ${visibility} meters</p>
        <p>Sunrise Time: ${sunriseTime.toLocaleTimeString()}</p>
        <p>Sunset Time: ${sunsetTime.toLocaleTimeString()}</p>
        <p>Weather ID: ${weatherId}</p>
    `;

    $('#weather-info').html(weatherInfo);
}


// Call the function to fetch weather data when the document is ready
$(document).ready(function() {
    getWeatherData();
});
