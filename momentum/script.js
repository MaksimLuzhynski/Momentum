// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  day = document.querySelector('.day');
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  speed = document.querySelector('.speed-wind'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  air = document.querySelector('.air-humidity'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  btn = document.querySelector('.btn'),
  btnImg = document.querySelector('.btnImg'),
  body = document.querySelector('.body');
  
//backgroundImage

const baseNight = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';
const baseMorning = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/morning/';
const baseDay = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/day/';
const baseEvening = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

var arrImg = new Array(6);

for (let i = 0; i < arrImg.length; i++) {
	
  var item = Math.floor(Math.random()*images.length);
  
  if (arrImg.includes(images[item]) === false) {
  arrImg[i] = images[item];
} else {
 i--;
}
}

var arrRandom = new Array(24); 

for (let i = 0; i < arrRandom.length; i++) {
 if (i >= 6 && i < 12) {
 arrRandom[i] = baseMorning + arrImg[i-6]
 } else if (i >= 12 && i < 18) {
 arrRandom[i] = baseDay + arrImg[i-12]
 } else if (i >= 18 && i < 24) {
 arrRandom[i] = baseEvening + arrImg[i-18]
 } else {
 arrRandom[i] = baseNight + arrImg[i]
 }
}


//Show Day
function showDay() {
  let today = new Date(),
    dayWeek = today.getDay(),
    data = today.getDate(),
    month = today.getMonth(),
    dayName = "",
    monthName = "";

    switch (dayWeek) {
      case 0:
        dayName = 'Sunday'
        break;
      case 1:
        dayName = 'Monday'
        break;
      case 2:
        dayName = 'Tuesday'
        break;
      case 3:
        dayName = 'Wednesday'
        break;
      case 4:
        dayName = 'Thursday'
        break; 
      case 5:
        dayName = 'Friday'
        break;
      case 6:
        dayName = 'Saturday'
        break;    
    }

    switch (month) {
      case 0:
        monthName = 'January'
        break;
      case 1:
        monthName = 'February'
        break;
      case 2:
        monthName = 'March'
        break;
      case 3:
        monthName = 'April'
        break;
      case 4:
        monthName = 'May'
        break; 
      case 5:
        monthName = 'June'
        break;
      case 6:
        monthName = 'July'
        break;
      case 7:
        monthName = 'August'
        break;
      case 8:
        monthName = 'September'
        break;
      case 9:
        monthName = 'October'
        break;
      case 10:
        monthName = 'November'
        break; 
      case 11:
        monthName = 'December'
        break; 
    }

  // Output Day
  day.innerHTML = `${dayName}<span>, </span>${(data)}<span> </span>${(monthName)}`;
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour > 5 && hour < 11) {
    // Morning
    document.body.style.backgroundImage =
      `url(${arrRandom[hour]})`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour > 11 && hour < 17) {
    // Afternoon
    document.body.style.backgroundImage =
    `url(${arrRandom[hour]})`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour > 17 && hour < 23)  {
    // Evening
    document.body.style.backgroundImage =
    `url(${arrRandom[hour]})`;
    greeting.textContent = 'Good Evening, ';
  } else {
    // Nigth
    document.body.style.backgroundImage =
    `url(${arrRandom[hour]})`;
    greeting.textContent = 'Good Nigth, ';
  }

  setTimeout(setBgGreet, 3600000);
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setField (e, field) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      field.blur();
      if (e.target.innerText !== '') {
        localStorage.setItem(field.id, e.target.innerText);
      } else {
        field.textContent = localStorage.getItem(field.id);
      }
      return true;
    }
  } else {
    if (e.target.innerText !== '') {
      localStorage.setItem(field.id, e.target.innerText);
    } else {
      field.textContent = localStorage.getItem(field.id);
    }
  }
  return false;
} 

function clickField(e) {
  e.target.textContent = "";
}

// Set Name
function setName(e) {
  setField (e, name)
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  setField (e, focus)
}

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=1561c004bc2005c2e964f6bfccacad94&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if(data.cod === "404") {
    city.textContent = `${data.message}`;
    temperature.textContent = `-°C`;
    speed.textContent = `spped wind - m/s`;
    air.textContent = `air humidity - %`;
    weatherIcon.classList.add(`none`);
    weatherDescription.textContent = "-";
  }

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  speed.textContent = `spped wind ${data.wind.speed} m/s`;
  air.textContent = `air humidity ${data.main.humidity} %`;
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Minsk';
  } else {
    city.textContent = localStorage.getItem('city');
  }
  getWeather();
}

// Set City
function setCity(e) {
  if(setField (e, city)) {
    getWeather();
  }
  
}

//quotes
async function getQuote() {  
  const url = `https://programming-quotes-api.herokuapp.com/quotes`;
  const res = await fetch(url);
  const data = await res.json(); 
  let item = Math.floor(Math.random()*data.length);
  blockquote.textContent = `${data[item].en}`;
  figcaption.textContent = `${data[item].author}`;
}

//backgroundImage

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

let today = new Date(),
    hour = today.getHours(),
    i = hour;

function getImage() {
  if (i == arrRandom.length-1) {
    i = 0;
  } 
  viewBgImage(arrRandom[i]);
  i++;
  btnImg.disabled = true;
  setTimeout(function() { btnImg.disabled = false }, 1000);
} 

btnImg.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickField);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickField);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', clickField);

// Run
showDay();
showTime();
setBgGreet();
getName();
getFocus();
getCity();
getImage();