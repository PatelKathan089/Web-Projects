// Getting the elements:-
const radioCity = document.getElementById("city");
const radioCurrentLocation = document.getElementById("current_location");
const cityInput = document.getElementById("city_input");
const dropDown = document.getElementById("dropdown");
const searchButton = document.getElementById("search");
const cityName = document.getElementById("city_name");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weatherImg = document.getElementById("weather_img");
const weatherDescription = document.getElementById("weather_description");
const cardContainer = document.getElementById("card_container");
const dropdownCities = document.getElementById("dropdown_cities");
const gitHub = document.getElementById("github_btn");

// Adding event listener to the GitHub button:-
gitHub.addEventListener("click", () => {
    window.open("https://github.com/PatelKathan089", "_blank");
})

// Declaring empty array to store the city names for dropdown_menu:-
let cityNamesList = JSON.parse(localStorage.getItem("cityNamesList")) || [];

// Toggle the visibility of the input field based on the selected radio button:-
const toggle_city = () => {
    if (radioCity.checked) {
        cityInput.style.display = "block";
    } else {
        cityInput.style.display = "none";
    }
};

toggle_city();
radioCity.addEventListener("change", toggle_city);
radioCurrentLocation.addEventListener("change", toggle_city);

// toggling the dropdown menu:-
cityInput.addEventListener("input", () => {
    const inputValue = cityInput.value.trim().toLowerCase();

    // Filter cities that match the input
    const filteredCities = cityNamesList.filter((city) =>
        city.toLowerCase().startsWith(inputValue)
    );

    // Display the dropdown menu if there are matching cities:-
    if (filteredCities.length > 0) {
        dropDown.style.display = "block";
        dropdownCities.innerHTML = "";

        filteredCities.forEach((city) => {
            dropdownCities.innerHTML += `<li class="cursor-pointer p-1 rounded hover:bg-slate-300">${city}</li>`;
        });

        // Adding event listener to the dropdown menu:-
        dropdownCities.querySelectorAll("li").forEach((li) => {
            li.addEventListener("click", () => {
                cityInput.value = li.textContent;
                dropDown.style.display = "none";
            });
        });
    } else {
        dropDown.style.display = "none";
    }
});

// Hiding the dropdown menu when clicking outside of it:-
document.addEventListener("click", (e) => {
    if (!dropDown.contains(e.target) && e.target !== cityInput) {
        dropDown.style.display = "none";
    }
});

// Fetching the weather data from the API using the city name:-
const getWeatherByCityName = async (city = "ahmedabad") => {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=7df05d21f7544cdfaa991117252004&q=${city}&days=7&aqi=no&alerts=no`
        );
        const data = await response.json();
        // Updating the current weather data:-
        const whiteSpace_index = data.location.localtime.indexOf(" ");
        cityName.innerHTML = `${data.location.name} (${data.location.localtime.slice(
            0,
            whiteSpace_index + 1
        )})`;
        temp.innerHTML = `Temperature: <span class="font-normal">${data.current.temp_c}<sup>o</sup> C</span>`;
        wind.innerHTML = `Wind: <span class="font-normal">${data.current.wind_kph} kmph</span>`;
        humidity.innerHTML = `Humidity: <span class="font-normal">${data.current.humidity}%</span>`;
        weatherImg.src = `https:${data.current.condition.icon}`;
        weatherImg.alt = data.current.condition.text;
        weatherDescription.innerHTML = data.current.condition.text;

        // Updating the forecast data:-
        cardContainer.innerHTML = ""; // Clearing the previous forecast data:-
        data.forecast.forecastday.map((item) => {
            return (
                cardContainer.innerHTML += `<div class="w-full flex flex-col items-center justify-center gap-1 bg-slate-200 text-slate-900 rounded-lg py-2 px-4 shadow-lg shadow-black">
                        <h4 class="font-bold">(${item.date})</h4>
                        <img src="https:${item.day.condition.icon}" alt="${item.day.condition.text}" width="70" height="70" />
                        <p class="self-start font-semibold">Temp:<span class="text-sm ml-1 font-normal">${item.day.avgtemp_c}<sup>o</sup> C</span></p>
                        <p class="self-start font-semibold">Wind:<span class="text-sm ml-1 font-normal">${item.day.maxwind_kph} kph</span></p>
                        <p class="self-start font-semibold">Humidity:<span class="text-sm ml-1 font-normal">${item.day.avghumidity}%</span></p>
                    </div>`);
        });
    } catch (err) {
        console.log(err);
        alert("Please enter a valid city name.");
    }
};

getWeatherByCityName(); // Fetching the weather data for the default city:-

// Fetching the weather data from the API using the current_location:-
const getWeatherByCurrentLocation = async (latitude, longitude) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7df05d21f7544cdfaa991117252004&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`);
        const data = await response.json();
        console.log(data);

        // Updating the current weather data:-
        const whiteSpace_index = data.location.localtime.indexOf(" ");
        cityName.innerHTML = `${data.location.name} (${data.location.localtime.slice(
            0,
            whiteSpace_index + 1
        )})`;
        temp.innerHTML = `Temperature: <span class="font-normal">${data.current.temp_c}<sup>o</sup> C</span>`;
        wind.innerHTML = `Wind: <span class="font-normal">${data.current.wind_kph} kmph</span>`;
        humidity.innerHTML = `Humidity: <span class="font-normal">${data.current.humidity}%</span>`;
        weatherImg.src = `https:${data.current.condition.icon}`;
        weatherImg.alt = data.current.condition.text;
        weatherDescription.innerHTML = data.current.condition.text;

        // Updating the forecast data:-
        cardContainer.innerHTML = ""; // Clearing the previous forecast data:-
        data.forecast.forecastday.map((item) => {
            return (
                cardContainer.innerHTML += `<div class="w-full flex flex-col items-center justify-center gap-1 bg-slate-200 text-slate-900 rounded-lg py-2 px-4 shadow-lg shadow-black">
                        <h4 class="font-bold">(${item.date})</h4>
                        <img src="https:${item.day.condition.icon}" alt="${item.day.condition.text}" width="70" height="70" />
                        <p class="self-start font-semibold">Temp:<span class="text-sm ml-1 font-normal">${item.day.avgtemp_c}<sup>o</sup> C</span></p>
                        <p class="self-start font-semibold">Wind:<span class="text-sm ml-1 font-normal">${item.day.maxwind_kph} kph</span></p>
                        <p class="self-start font-semibold">Humidity:<span class="text-sm ml-1 font-normal">${item.day.avghumidity}%</span></p>
                    </div>`);
        });

    } catch (err) {
        console.log(err);
        alert("Sorry!,we can't fetch your real time location.");
    }

};

// Adding event listener to the search button for calling the weather api:-
searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // Preventing the default behavior of the form:-
    if (radioCity.checked) {
        const cityName = cityInput.value.trim().toLowerCase();

        // Adding validation before searching the city:-
        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        // Storing the only city names which are not present in dropdown menu:-
        if (!cityNamesList.includes(cityName)) {
            cityNamesList.push(cityName);
            localStorage.setItem("cityNamesList", JSON.stringify(cityNamesList));
        }
        getWeatherByCityName(cityName);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherByCurrentLocation(latitude, longitude);
            }, (err) => {
                console.log(err);
            });
        }
    }
});
