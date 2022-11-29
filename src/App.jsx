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
  const [dataArray, setDataArray] = useState([]);
  const selectCity = useRef();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState("")

  // const [selectCity, setSelectCity] = useState(null)
  console.log(dataArray);
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({});

    //BUSCAMOS EL NOMBRE DE LA CIUDAD:
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${
          input.current.value
        }&limit=5&appid=${import.meta.env.VITE_API_KEY}&lang=sp`
      )
      .then((res) => setDataArray(res.data));

    // axios
    //   .get(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${
    //       input.current.value
    //     }&limit=5&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=sp`
    //   )
    //   .then((res) => setData(res));
  };

  const handleSelectCity = (e) => {
    e.preventDefault();
    setData({});
    console.log("HOLITA");
    // setSelectCity(e.target)
    const [latitudes, longitudes, countryy] = selectCity.current.value.split(",");
    console.log(countryy)
    setLatitude(latitudes);
    setLongitude(longitudes);
    setCountry(countryy)
   
  };
 

  const handleSearchCity = (e) => {
    e.preventDefault();
    console.log(latitude);
    console.log(longitude);

    if (latitude !== 0 && longitude !== 0) {
      const a = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=sp`
        )
        .then((res) => {setData(res); });
    }
      console.log("selectCity22", data);
  };

  return (
    <div className="container">
      <GeoCity />



      {dataArray.length > 0 && (
        <div >
          <select ref={selectCity} onChange={handleSelectCity}>
           
            {dataArray?.map((el, index) => {
              return (
                <option key={index}  value={[el.lat, el.lon, el.country]}>
                  {el.name} - {el.country} {el.lat} -- {el.lon}
                </option>
              );
            })}
          </select>
          <button onClick={handleSearchCity}>Seleccionar</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input ref={input} type="text" placeholder="Ingresa una ciudad" />
        <button>Buscar ciudad</button>
      </form>

      {data.status === 200 && <OtherCity data={data} country={country} />}
    </div>
  );
}

export default App;
