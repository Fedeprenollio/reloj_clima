import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Fecha } from "./Fecha";
import { Weather } from "./Weather";
import { Time } from "./Time";

export const GeoCity = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes()
  );
  const [seconds, setSeconds] = useState(
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds()
  );
  const [day, setDay] = useState(new Date().getDay());
  const [month, setMonth] = useState(new Date().getMonth());
  const [number, setNumber] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());


  useEffect(() => {
    setInterval(() => {
      setHour(new Date().getHours());
      if (new Date().getHours() < 10) {
        setHour("0" + new Date().getHours());
      }
      setMinutes(new Date().getMinutes());
      if (new Date().getMinutes() < 10) {
        setMinutes("0" + new Date().getMinutes());
      }

      setSeconds(new Date().getSeconds());
      if (new Date().getSeconds() < 10) {
        setSeconds("0" + new Date().getSeconds());
      }
      setDay(new Date().getDay());
      setMonth(new Date().getMonth());
      setNumber(new Date().getDate());
      setYear(new Date().getFullYear());
      
    }, 1000);
  }, []);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      let success = function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      };
      navigator.geolocation.getCurrentPosition(success, function (msg) {
        console.error(msg);
      });
    }
    if (latitude !== 0 && longitude !== 0) {
      const a = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=sp`
        )
        .then((res) => setData(res));
    }

  
  }, [latitude, longitude]);

  return (
    <div className="container">
      {/* FECHA */}
      <Fecha day={day} number={number} month={month} year={year} />
      {/* CONDICIONES METEOROLOGICAS */}
      {data?.data?.name ? <Weather data={data} /> : <p>cargando...</p>}
      {/* TIEMPO */}
      <Time hour={hour} minutes={minutes} seconds={seconds} />
     
    </div>
  );
};