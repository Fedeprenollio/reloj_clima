import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Weather } from "./Weather";
import { Fecha } from "./Fecha";
import { Time } from "./Time";
import { Maps } from "./maps/Maps";
import { ButtonShowMap } from "./ButtonShowMap";

const OtherCity = ({ data, country, state, latitude, longitude }) => {
  const [city, setCity] = useState(null);
  const [day, setDay] = useState(new Date(city).getDay());
  const [month, setMonth] = useState(new Date(city).getMonth());
  const [number, setNumber] = useState(new Date(city).getDate());
  const [year, setYear] = useState(new Date(city).getFullYear());
  const [hour, setHour] = useState(new Date(city).getHours());
  const [minutes, setMinutes] = useState(new Date(city).getMinutes());
  const [seconds, setSeconds] = useState(new Date(city).getSeconds());
  const timezone = data?.data?.timezone;
  // let city
  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      let localTime = d.getTime();
      let localOffset = d.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      setCity(utc + 1000 * timezone);
    }, 1000);
  }, [city]);


  useEffect(() => {
    setDay(new Date(city).getDay());
    setNumber(new Date(city).getDate());
    setMonth(new Date(city).getMonth());
    setYear(new Date(city).getFullYear());
    setHour(new Date(city).getHours());
    if (new Date(city).getHours() < 10) {
      setHour("0" + new Date(city).getHours());
    }
    setMinutes(new Date(city).getMinutes());
    if (new Date(city).getMinutes() < 10) {
      setMinutes("0" + new Date(city).getMinutes());
    }

    setSeconds(new Date(city).getSeconds());
    if (new Date(city).getSeconds() < 10) {
      setSeconds("0" + new Date(city).getSeconds());
    }
  }, [city]);

  const [showMap, setShowMap] = useState(false)
  const handleShowMap = () => {
    setShowMap(!showMap)
  }


  return (
    <div className="container">
      {data.data && (
        <div>
          {/* FECHA */}
          <Fecha day={day} number={number} month={month} year={year} />
          {/* CONDICIONES METEOROLOGICAS */}
          {data ? <Weather data={data} country={country} state={state} /> : <p>cargando...</p>}
          {/* TIEMPO */}
          <Time hour={hour} minutes={minutes} seconds={seconds} />
          <ButtonShowMap handleShowMap={handleShowMap} setShowMap={setShowMap} showMap={showMap}>{showMap ? "Ocultar" : "Mostrar"} mapa de la ubicación</ButtonShowMap>

          {showMap && <Maps latitude={latitude} longitude={longitude} />}
        </div>
      )}
    </div>
  );
};

export default OtherCity;
//
