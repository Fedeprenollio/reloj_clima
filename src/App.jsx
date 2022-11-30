import React, { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import OtherCity from "./OtherCity";
import { Fecha } from "./Fecha";
import { Weather } from "./Weather";
import { Time } from "./Time";
import { GeoCity } from "./GeoCity";
import { SelectCities } from "./SelectCities";
import { InputSearchCity } from "./InputSearchCity";

function App() {
  const input = useRef();
  const [dataArray, setDataArray] = useState([]);
  const selectCity = useRef();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState("");
  const [data, setData] = useState({});
console.log(data)
  return (
    <div className="container">
      <GeoCity />

      <SelectCities
        dataArray={dataArray}
        selectCity={selectCity}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCountry={setCountry}
        setData={setData}
        longitude={longitude}
        latitude={latitude}
      />

      <InputSearchCity
        setDataArray={setDataArray}
        setData={setData}
        input={input}
      />

      {data.status === 200 && <OtherCity data={data} country={country} />}
    </div>
  );
}

export default App;
