const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItems = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryE1 = document.getElementById("country");
const weatherForecastE1 = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May ",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const API_KEY = "d613f09e89f6be490d639b875f2449db";
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour > 12 ? "PM" : "AM";
  timeE1.innerHTML =
    hourIn12HrFormat + ":" + minutes + " " + `<span id='am-pm>${ampm}</span>'`;
  dateE1.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

getWeatherDate();
function getWeatherDate() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
  currentWeatherItems.innerHTML = `<div class="weather-item">
       <div>Humidity</div>
       <div>${humidity}%</div>
   </div>
   <div class="weather-item">
       <div>Pressure</div>
       <div>${pressure}</div>
   </div>
   <div class="weather-item">
       <div>Wind Speed</div>
       <div>${wind_speed}</div>
   </div>
   <div class="weather-item">
       <div>Sunrise</div>
       <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
   </div>
   <div class="weather-item">
       <div>Sunset</div>
       <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
   </div>
`;
  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx === 0) {
    } else {
      otherDayForcast += `
    <div class="weather-forecast-item">
    <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
    <img
      src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
      alt="weather icon"
      class="w-icon"
    />
    <div class="temp">Night - ${day.temp.night}&#176; C</div>
    <div class="temp">Day - ${day.temp.day}&#176; C</div>
  </div>
    `;
    }
  });

  weatherForecastE1.innerHTML = otherDayForcast;
}
