import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
// import { get } from 'immer/dist/internal';

// current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units={metric}
// response:
// {"coord":{
//   "lon":121.5749,
//   "lat":25.075
//    },
//   "weather":[{
//     "id":803,
//     "main":"Clouds",
//     "description":"broken clouds",
//     "icon":"04d"
//   }],
//   "base":"stations",
//   "main":{
//     "temp":25.42,
//     "feels_like":25.38,
//     "temp_min":23.94,
//     "temp_max":26.96,
//     "pressure":1011,
//     "humidity":52
//   },
//   "visibility":10000,
//   "wind":{
//     "speed":6.69,
//     "deg":70
//   },
//   "clouds":{
//     "all":75
//   },
//   "dt":1652856429,
//   "sys":{
//     "type":1,
//     "id":7949,
//     "country":"TW",
//     "sunrise":1652821692,
//     "sunset":1652869935
//   },
//   "timezone":28800,
//   "id":1677028,
//   "name":"Zhuzilin",
//   "cod":200
// }

// daily forcast 16 days

function App() {
  const API_KEY = "e9d85e9acc0ccd407f6b9190edd89c2a";
  const [currentWeather, setCurrentWeather] = useState({
    description: "",
    icon: "",
    time: "",
    temp: "",
    temp_max: "",
    temp_mim: "",
    temp_feels_like: "",
    wind_speed: "",
    rain: "",
    sunrise: "",
    sunset: "",
    city: "",
  });

  const timeConvert = (timestamp) => {
    const time = new Date(timestamp);
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    let hour = time.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = time.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    return year + "/" + month + "/" + date + "  " + hour + ":" + minute;
  };

  const getCurrentWeather = async (url) => {
    const response = await axios.get(url);
    console.log(response.data);
    setCurrentWeather({
      ...currentWeather,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      time: timeConvert(response.data.dt * 1000),
      temp: response.data.main.temp,
      temp_max: response.data.main.temp_max,
      temp_min: response.data.main.temp_min,
      wind_speed: response.data.wind.speed,
      sunrise: timeConvert(response.data.sys.sunrise * 1000),
      sunset: timeConvert(response.data.sys.sunset * 1000),
      city: response.data.name,
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getCurrentWeather(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
        );
        // console.log(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  return (
    <>
      <div className="container">
          <p>{currentWeather.time}</p>
        <div className="top">
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt="weather-icon"
            width="200px"
          />
          <div className="temp-area">
            <h1>{currentWeather.temp}&#8451;</h1>
            <p>
              {currentWeather.temp_min}&#8451; ~ {currentWeather.temp_max}
              &#8451;
            </p>
          </div>
        </div>
          <p>{currentWeather.description}</p>
      </div>
      <footer>
        <div className="section">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </div>
      </footer>
    </>
  );
}

export default App;
