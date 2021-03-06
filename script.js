let appId = 'c9e5a079383d4d23e69d4bd0051bc077';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else 
    searchMethod = 'q';
}

function searchWeather (searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("img/rain1.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;

            default:
             break;
    }

        let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
        let temperatureElement = document.getElementById('temperature');
        let humidityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');
        let weatherIcon = document.getElementById('documentIconImg');

        weatherIcon.src = 'https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

        let resultDescription = resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

        temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

        windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';

        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = 'Humidity level at ' + resultFromServer.main.humidity + '%';

        SetPositionForWeatherInfo();
}

function SetPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weaherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weaherContainerHeight / 1.8}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})
