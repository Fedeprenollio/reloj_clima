import React from "react";
import {GoLocation} from "react-icons/go"
export const Weather = ({ data, country, state, isGeo }) => {

  return (
    <div className="weather">
      <p className="city">{data?.data?.name} {isGeo && <GoLocation/> } </p>
        
      {state && <p style={{ fontSize: "0.7em" }}>{state}</p>}{" "}
      {country && <p style={{ fontSize: "0.7em" }}>{country}</p>}
      <div className="temperature">
        <div className="description">
          <p className="p-temperature"> {data?.data?.main.temp} °C</p>
          <p>Sensación térmica: {data?.data?.main.feels_like} °C</p>
          
          {/* <p>{data?.data?.weather[0]?.description}</p> */}
          <p>
            {data?.data?.weather[0]?.description[0].toUpperCase() +
              data?.data?.weather[0]?.description.substring(1)}
          </p>
          <p>Viento {Math.floor(data?.data?.wind.speed*3.6)} km/h</p>
          <p>Humedad: {data?.data?.main?.humidity} %</p>
          {data?.data?.rain && (
            <p>En la última hora han llovido {data?.data?.rain["1h"]} mm</p>
          )}
          {data?.data?.snow && (
            <p>En la última hora han nevado {data?.data?.snow["1h"]} mm</p>
          )}
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@2x.png`}
          
        />
      </div>
    </div>
  );
};
