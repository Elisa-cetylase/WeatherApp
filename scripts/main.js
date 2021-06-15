import daysInOrder from './Manager/daysManager.js';

// console.log("From mainJS:" + daysInOrder);

const APIKEY = ""; // Get your own key ;)
let APIresults;

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const location = document.querySelector('.location');
const hour = document.querySelectorAll('.hour');
const temperatureByHour = document.querySelectorAll('.hour-values');
const daysDiv = document.querySelectorAll('.day-prevision-name');
const weatherdaysDiv = document.querySelectorAll('.day-prevision-weather');
const imgIcone = document.querySelector('.logo-weather');
const loadContainer = document.querySelector('.overlay-icone-load');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
    callAPI(long,lat);

    }, () => {
        alert(`L'application ne peut fonctionner que si vous avez activé la géolocalisation :)`)
    })
}

function callAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        // console.log(data);

        APIresults = data;

        weather.innerText = APIresults.current.weather[0].description;
        temperature.innerText = `${Math.trunc(APIresults.current.temp)}°`
        location.innerText = APIresults.timezone;


        // Hours, hours * 3 with temperatures.

        let thisHour = new Date().getHours();

        for(let i = 0; i < hour.length; i++) {

            let threeHoursLater = thisHour + i * 3;

            if(threeHoursLater > 24) {
                hour[i].innerText = `${threeHoursLater - 24} h`;
            } else if(threeHoursLater === 24) {
                hour[i].innerText = "00 h"
            } else {
                hour[i].innerText = `${threeHoursLater} h`;
            }

        }

        // temperature for 3h
        for(let j = 0; j < temperatureByHour.length; j++) {
            temperatureByHour[j].innerText = `${Math.trunc(APIresults.hourly[j * 3].temp)}°`
        }


        // 3 first letters of days 

        for(let k = 0; k < daysInOrder.length; k++) {
            daysDiv[k].innerText = daysInOrder[k].slice(0,3);
        }


        // By day
        for(let m = 0; m < 7; m++){
            weatherdaysDiv[m].innerText = `${Math.trunc(APIresults.daily[m + 1].temp.day)}°`
        }

        // Dynamic weather icon changing when it's day or night
         if(thisHour >= 6 && thisHour < 21) {
             imgIcone.src = `./ressources/day/${APIresults.current.weather[0].icon}.svg`
         } else  {
            imgIcone.src = `./ressources/night/${APIresults.current.weather[0].icon}.svg`
         }

         loadContainer.classList.add('hide');

    })

}