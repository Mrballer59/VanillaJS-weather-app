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
  });
}
10.8505159;
76.2710833;
