import React, { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import OtherCity from "./OtherCity";
import { Fecha } from "./Fecha";
import { Weather } from "./Weather";
import { Time } from "./Time";
import { GeoCity } from "./GeoCity";

function App() {
  const input = useRef();
  const [data, setData] = useState({});
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({})
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          input.current.value
        }&limit=5&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=sp`
      )
      .then((res) => setData(res));




  };


  // const [minutes, setMinutes] = useState(
  //   new Date().getMinutes() < 10
  //     ? "0" + new Date().getMinutes()
  //     : new Date().getMinutes()
  // );
  // const [seconds, setSeconds] = useState(
  //   new Date().getSeconds() < 10
  //     ? "0" + new Date().getSeconds()
  //     : new Date().getSeconds()
  // );
  // const [day, setDay] = useState(new Date().getDay());
  // const [month, setMonth] = useState(new Date().getMonth());
  // const [number, setNumber] = useState(new Date().getDate());
  // const [year, setYear] = useState(new Date().getFullYear());

  // // function actualizar() {
  // //   setInterval(() => {
  // //     setHour(date.getHours());
  // //     setMinutes(date.getMinutes());
  // //     setSeconds(date.getSeconds());
  // //     setDay(date.getDay());
  // //     setMonth(date.getMonth());
  // //     setNumber(date.getDate())
  // //     setYear(date.getFullYear())
  // //   }, 1000);
  // // }

  // useEffect(() => {
  //   setInterval(() => {
  //     setHour(new Date().getHours());
  //     if (new Date().getHours() < 10) {
  //       setHour("0" + new Date().getHours());
  //     }
  //     setMinutes(new Date().getMinutes());
  //     if (new Date().getMinutes() < 10) {
  //       setMinutes("0" + new Date().getMinutes());
  //     }

  //     setSeconds(new Date().getSeconds());
  //     if (new Date().getSeconds() < 10) {
  //       setSeconds("0" + new Date().getSeconds());
  //     }
  //     setDay(new Date().getDay());
  //     setMonth(new Date().getMonth());
  //     setNumber(new Date().getDate());
  //     setYear(new Date().getFullYear());
  //    
  //   }, 1000);
  // }, []);

  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     let success = function (position) {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     };
  //     navigator.geolocation.getCurrentPosition(success, function (msg) {
  //       console.error(msg);
  //     });
  //   }
  //   // const a = axios.get( "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=ce92cb297e528077564dacc3bc683cce").then(res=> console.log(res))
  //   if (latitude !== 0 && longitude !== 0) {
  //     const a = axios
  //       .get(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
  //           import.meta.env.VITE_API_KEY
  //         }&lang=sp`
  //       )
  //       .then((res) => setData(res));
  //   }

  //  
  // }, [latitude, longitude]);

  return (
    <div className="container">
      <GeoCity />
      <form onSubmit={handleSubmit}>
        <input ref={input} type="text" placeholder="Ingresa una ciudad" />
        <button>Buscar ciudad</button>
      </form>

      {data.status === 200 && <OtherCity data={data}  />}
    </div>
  );
}

export default App;
