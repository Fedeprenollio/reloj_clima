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
import { Maps } from "./maps/Maps";

function App() {

  const input = useRef();
  const [dataArray, setDataArray] = useState([]);
  const selectCity = useRef();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [data, setData] = useState({});

  return (
    <div className="container">
      <h1 className="title">Reloj con estado del tiempo</h1>
      <p></p>
      <GeoCity />


      <InputSearchCity
        setDataArray={setDataArray}
        setData={setData}
        input={input}
        dataArray={dataArray}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />

      <SelectCities
        dataArray={dataArray.data}
        setDataArray={setDataArray}
        selectCity={selectCity}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCountry={setCountry}
        setState={setState}
        setData={setData}
        longitude={longitude}
        latitude={latitude}
      />

      {data.status === 200 && (
        <OtherCity data={data} country={country} state={state} longitude={longitude}
          latitude={latitude} />
      )}
    </div>
  );
}

export default App;
