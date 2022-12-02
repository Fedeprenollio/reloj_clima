import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Fecha } from "./Fecha";
import { Weather } from "./Weather";
import { Time } from "./Time";
import { Maps } from "./maps/Maps";
import { ButtonShowMap } from "./ButtonShowMap";

export const GeoCity = () => {
  const [permissions, setPermissions] = useState(true);
  const [errorPermission, setErrorPermission] = useState(0);
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
  const [isGeo, setIsGeo] = useState(false)

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
        setIsGeo(true)
      };
      navigator.geolocation.getCurrentPosition(success, function (msg) {
        console.error("No has dado los permisos?", msg);
        switch (msg.code) {
          case 1:
            setErrorPermission("Permiso denegado");

            break;
          case 2:
            setErrorPermission("Error al obtener la ubicación");
            break;
          case 3:
            setErrorPermission(
              "Se ha tardado mucho tiempo en obtener la ubicación"
            );
            break;
          default:
            setErrorPermission("Error desconocido")
            break;
        }
        setPermissions(false);
      });
    }
    if (latitude !== 0 && longitude !== 0) {
      const a = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_API_KEY
          }&lang=sp`
        )
        .then((res) => setData(res));
    }
  }, [latitude, longitude]);
  

  const [showMap, setShowMap] = useState(false)
  const handleShowMap = () => {
      setShowMap(!showMap)
  }

  return (
    <div className="container container-geo">
      {/* FECHA */}
      <Fecha day={day} number={number} month={month} year={year} />
      {/* CONDICIONES METEOROLOGICAS */}
      {!permissions ? (
        <div>
          <p>
            No es posible establecer las condiciones meteorologicas al no darle
            permiso de tu ubicación a la app. Prueba buscar una ciudad
            manualmente o concede el permiso manualmente.
          </p>
          <p style={{ color: "red" }}>{errorPermission}.</p>
        </div>
      ) : data?.data?.name ? (
        <Weather data={data} isGeo={isGeo} />
      ) : (
        <p>cargando...</p>
      )}

      {/* TIEMPO */}
      <Time hour={hour} minutes={minutes} seconds={seconds} />
      <ButtonShowMap handleShowMap={handleShowMap} setShowMap={setShowMap} showMap={showMap}>{showMap ? "Ocultar" : "Mostrar"} mapa de la ubicación</ButtonShowMap>
      {showMap &&   <Maps latitude={latitude} longitude={longitude} />}
     
    </div>
  );
};
