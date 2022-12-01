import React, { useRef } from "react";
import axios from "axios";

export const SelectCities = ({
  dataArray,
  setDataArray,
  selectCity,
  setLatitude,
  setLongitude,
  setCountry,
  setState,
  setData,
  latitude,
  longitude,
}) => {
 

  const handleSelectCity = (e) => {
    e.preventDefault();
    const [latitudes, longitudes, country, state] =
    selectCity.current.value.split(",");

    setLatitude(latitudes);
    setLongitude(longitudes);
  
  };

  const handleSearchCity = (e) => {

    e.preventDefault();
    setData({});

    if (latitude !== 0 && longitude !== 0) {
      const a = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }&lang=sp`
        )
        .then((res) => {
          setData(res);
          const [latitudes, longitudes, country, state] =
          selectCity.current.value.split(",");
          setCountry(country);
          setState(state);
        });
    }
  };

  return (
    dataArray?.length > 0 && (
      <div className=" container-select">
        <select
        autoFocus
          className="selectCity"
          ref={selectCity}
          onChange={handleSelectCity}
          defaultValue="null"
        >
          <option id="sel" disabled value="null">
            Selecciona una ciudad
          </option>

          {dataArray?.map((el, index) => {
            return (
              <option
                key={index}
                value={[el.lat, el.lon, el.country, el.state]}
              >
                {el.name} - {el.country}
              </option>
            );
          })}
        </select>
        <button onClick={handleSearchCity}>Seleccionar</button>
      </div>
    )
  );
};
