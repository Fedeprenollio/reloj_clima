import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Weather } from "./Weather";
import { Fecha } from "./Fecha";
import { Time } from "./Time";

const OtherCity = ({ data }) => {
  const [city, setCity] = useState(null);
  const timezone  = data?.data?.timezone
  // let city
  useEffect(() => {
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    setInterval(() => {
      setCity(utc + 1000 *timezone );
     const nd = new Date(city)
    
    }, 1000);
    setDay(new Date(city).getDay());
    setNumber(new Date(city).getDate());
    setMonth(new Date(city).getMonth());
    setYear(new Date(city).getFullYear());
    setHour(new Date(city).getHours());
    setMinutes(new Date(city).getMinutes());
    setSeconds(new Date(city).getSeconds());
  }, [ city]);

  // let localHour = new Date(city);

  const [day, setDay] = useState(new Date(city).getDay());
  const [month, setMonth] = useState(new Date(city).getMonth());
  const [number, setNumber] = useState(new Date(city).getDate());
  const [year, setYear] = useState(new Date(city).getFullYear());
  const [hour, setHour] = useState(new Date(city).getHours());
  const [minutes, setMinutes] = useState(new Date(city).getMinutes());
  const [seconds, setSeconds] = useState(new Date(city).getSeconds());

  // useEffect(() => {
  //   setDay(new Date(city).getDay());
  //   setNumber(new Date(city).getDate());
  //   setMonth(new Date(city).getMonth());
  //   setYear(new Date(city).getFullYear());
  //   setHour(new Date(city).getHours());
  //   setMinutes(new Date(city).getMinutes());
  //   setSeconds(new Date(city).getSeconds());
  // }, [city, data]);
  return (
    <div>
      {data.data && (
        <div>
          {/* FECHA */}
          <Fecha day={day} number={number} month={month} year={year} />
          {/* CONDICIONES METEOROLOGICAS */}
          {data?.data?.name ? <Weather data={data} /> : <p>cargando...</p>}
          {/* TIEMPO */}
          <Time hour={hour} minutes={minutes} seconds={seconds} />
        </div>
      )}
    </div>
  );
};

export default OtherCity;
//
