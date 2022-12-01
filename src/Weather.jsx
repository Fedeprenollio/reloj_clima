import React from "react";

export const Weather = ({ data, country, state }) => {
  return (
    <div className="weather">
      <p className="city">{data?.data?.name} </p>
      {state && <p style={{ fontSize: "0.7em" }}>{state}</p>}{" "}
      {country && <p style={{ fontSize: "0.7em" }}>{country}</p>}
      <div className="temperature">
        <div className="description">
          <p>Temperatura: {data?.data?.main.temp} °C</p>
          {/* <p>{data?.data?.weather[0]?.description}</p> */}
          <p>
            {data?.data?.weather[0]?.description[0].toUpperCase() +
              data?.data?.weather[0]?.description.substring(1)}
          </p>
          <p>Viento {data?.data?.wind.speed} km/h</p>
          {data?.data?.rain && (
            <p>En la última hora han llovido {data?.data?.rain["1h"]} mm</p>
          )}
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@2x.png`}
          alt=""
        />
      </div>
    </div>
  );
};
