import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const date = new Date();
  const [hour, setHour] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes()<10 ? "0"+ new Date().getMinutes() : (new Date().getMinutes()))
  const [seconds, setSeconds] = useState(
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds()
  );
  const [day, setDay] = useState(new Date().getDay());
  const [month, setMonth] = useState(new Date().getMonth());
  const [number, setNumber] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [termperature, setTermperature] = useState(0);

  // function actualizar() {
  //   setInterval(() => {
  //     setHour(date.getHours());
  //     setMinutes(date.getMinutes());
  //     setSeconds(date.getSeconds());
  //     setDay(date.getDay());
  //     setMonth(date.getMonth());
  //     setNumber(date.getDate())
  //     setYear(date.getFullYear())
  //   }, 1000);
  // }

  useEffect(() => {
    setInterval(() => {
      setHour(new Date().getHours());
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
      // console.log("Gola")
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
    // const a = axios.get( "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=ce92cb297e528077564dacc3bc683cce").then(res=> console.log(res))
    if (latitude !== 0 && longitude !== 0) {
      const a = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ce92cb297e528077564dacc3bc683cce&&lang=sp`
        )
        .then((res) => setData(res));
    }

    console.log(data);
  }, [latitude, longitude]);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  return (
    <div className="container">
      <div className="date">
        <p>
          {days[day]} de {number} de {months[month]} {year}
        </p>
        {/* <p className="day date-border">{days[day]}</p>
        <p className="number date-border">{number} </p>
        <p className="number date-border">de </p>
        <p className="month date-border">{months[month]} </p>
        <p className="number date-border">de </p>
        <p className="year date-border"> {year}</p> */}
      </div>

      <div className="weather">
        <p className="city">{data?.data?.name}</p>
        <div className="temperature">
          <div className="description">
            <p>Temperatura: {data?.data?.main.temp}</p>
            {/* <p>{data?.data?.weather[0]?.description}</p> */}
            <p>
              {data?.data?.weather[0]?.description[0].toUpperCase() +
                data?.data?.weather[0]?.description.substring(1)}
            </p>
            <p>Viento {data?.data?.wind.speed} km/h</p>
            {
              data?.data?.rain && 
              <p>En la última hora han llovido {data?.data?.rain["1h"]} mm</p>

            }
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@2x.png`}
            alt=""
          />
        </div>
      </div>

      <div className="time">
        <p className="hour time-border">{hour} </p>
        <p className="minute time-border">:</p>
        <p className="minute time-border">{minutes}</p>
        <p className="minute time-border">:</p>
        <p className="second time-border">{seconds} </p>
      </div>
    </div>
  );
}

export default App;
