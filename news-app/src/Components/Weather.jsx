import React from "react";

const Weather = ({ weatherData }) => {
  const { location, current } = weatherData;
  return (
    <div className="weatherContainer">
      <div className="weatherDataContainer">
        <div className="currentData">
          <span className="condition">
            <p> Condition: {current?.condition.text}</p>
            <img src={current?.condition.icon} alt="" />
          </span>
          <p>Cloud: {current?.cloud}</p>
          <p>Feels like: {current?.feelslike_c} C</p>
          <p>Feels like: {current?.feelslike_f} F</p>
          <p>Humidity: {current?.humidity}</p>
          <p>Temp: {current?.temp_c} C</p>
          <p>Temp: {current?.temp_f} F</p>
          <p>Wind Direction: {current?.wind_dir}</p>
          <p>Wind degree: {current?.wind_degree}</p>
          <p>Wind kph: {current?.wind_kph}</p>
          <p>Wind mph: {current?.wind_mph}</p>
          <p>Last updated: {current?.last_updated}</p>
        </div>
        <div className="locationData">
          <p>Country: {location?.country}</p>
          <p>City: {location?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
