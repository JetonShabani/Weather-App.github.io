const api = {
    key: "5f8b09d18ebd893fb18f211845e04d6a",
    base: "https://api.openweathermap.org/data/2.5/"

}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();     //prevent page from reloading
    if(event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
}

function displayData (response) {
       // console.log(response);
       if (response.cod === "404") {
           const error = document.querySelector(".error");
           error.textContent = "Please enter a valid city";
           search.value = "";
       } else {
           const city = document.querySelector(".city");
           city.innerText = `${response.name}, ${response.sys.country}`;   //see the city name in html
           
           const today = new Date();                      // new date in base at your current date
           const date = document.querySelector(".date");
           date.innerText = dateFunction(today);
            
           const temp = document.querySelector(".temp");    //change temp. based on api
           temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

           const weather = document.querySelector(".weather");  //change the weather from sunny
            weather.innerText = `Weather: ${response.weather[0].main}`;

            const tempRange = document.querySelector(".temp-range");    // change the temp range from api
            tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${response.main.temp_max}°C`
       
            const weatherIcon = document.querySelector(".weather-icon");    //will let you to see the temp. icon
            const iconURL = "http://openweathermap.org/img/w/";
            weatherIcon.src = iconURL + response.weather[0].icon + ".png";

            search.value = "";
        }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

