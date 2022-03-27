import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=465efa2704855950bf5cc66d2bb4967d`;
  const weatherDetailUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coord?.lat}&lon=${data.coord?.lon}&appid=465efa2704855950bf5cc66d2bb4967d`;
  // const urlMapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/$%7Bcountry%7D.json?access_token=pk.eyJ1IjoidXJhbmhhbmQiLCJhIjoiY2wwYXgwZ3g4MHJhZjNjbGcwbTN6cGdwZyJ9.9gH5D0hLt6-ZgMtCAgZD5w`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        // console.log(response.data);
      });
      setLocation("");
    }
  };
  console.log(weatherDetailUrl)

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Байршил хайх"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {/* {data.weather ? <p>{data.weather[0].main}</p> : null} */}
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold"> {data.main.feels_like.toFixed()} °C</p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold"> {data.main.humidity} %</p>
                ) : null}
                <p>Чийгшил</p>
              </div>
              <div className="wind">
                {data.main ? (
                  <p className="bold"> {data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Салхины хурд</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
