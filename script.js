const apiKey = 'c0fb164a8fbc24b9ce64e2dacb7ae2be';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector("#weather-icon");

async function getWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const localTime = new Date((data.dt + data.timezone) * 1000);
    const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
    const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
    const isDayTime = localTime >= sunrise && localTime < sunset;

    document.querySelector(".day-night").innerHTML = isDayTime ? "Day" : "Night";
    weatherIcon.src = getWeatherIcon(isDayTime, data.weather[0].main);
}

function getWeatherIcon(isDayTime, weatherMain) {
    if (weatherMain === "Clouds") {
        return isDayTime ? "./img/clouds-day.png" : "./img/clouds-night.png";
    } else if (weatherMain === "Clear") {
        return isDayTime ? "./img/clear-day.png" : "./img/clear-night.png";
    } else if (weatherMain === "Rain") {
        return isDayTime ? "./img/rain.png" : "./img/rain.png";
    } else if (weatherMain === "Drizzle") {
        return isDayTime ? "./img/drizzle-day.png" : "./img/drizzle-night.png";
    } else if (weatherMain === "Mist") {
        return isDayTime ? "./img/mist-day.png" : "./img/mist-night.png";
    } else if (weatherMain === "Haze") {
        return isDayTime ? "./img/haze.png" : "./img/haze.png";
    } else {
        return "./img/clear-day.png"; // Default icon if no match
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather(searchBox.value);
    }
});

// Geolocation
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            fetch(geoApiUrl)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".city").innerHTML = data.name;
                    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + " °C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
                    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                    const localTime = new Date((data.dt + data.timezone) * 1000);
                    const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
                    const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
                    const isDayTime = localTime >= sunrise && localTime < sunset;

                    document.querySelector(".day-night").innerHTML = isDayTime ? "Day" : "Night";
                    weatherIcon.src = getWeatherIcon(isDayTime, data.weather[0].main);
                });
        });
    }
};
