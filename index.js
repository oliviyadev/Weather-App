const api = {
  key: '3a1883cf562f5b53460ae67fe42fecfa',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
var toggled = false;

//Temperature Toggle
function toggle() {
  let button= document.querySelector('#toggle');
  if(!toggled){
    button.innerHTML='°F';
    toggled = true;
  } else if(toggled){
    toggled = false;
    button.innerHTML='°C';
  };
}
// looks for user to hit enter
function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}
// makes api call
function getResults(query) {
  if(!toggled){
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
} else{
  fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}
}
// displays weather from api call
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText= `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  let temp = document.querySelector('.current .temp');
  if(!toggled){
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  } else {
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`
  }
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  
  let hilow = document.querySelector('.current .hi-low');
  if(!toggled){
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    } else {
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
    }
}
// constructs the current date in user-inputted location
function dateBuilder (d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`
}
