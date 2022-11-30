import React from "react";
import axios from "axios";

export const SelectCities = ({
  dataArray,
  selectCity,
  setLatitude,
  setLongitude,
  setCountry,
  setData,
  latitude,
  longitude

 
}) => {
  const handleSelectCity = (e) => {
    console.log("tengo q setear la latitud");
    e.preventDefault();
    // setData({});

    const [latitudes, longitudes, countryy] =
      selectCity.current.value.split(",");

    setLatitude(latitudes);
    setLongitude(longitudes);
    setCountry(countryy);
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
        });
    }
   
  };

  return (
    <>
      {dataArray.length > 0 && (
        <div>
          <select ref={selectCity} onChange={handleSelectCity}>
            {dataArray?.map((el, index) => {
              return (
                <option key={index} value={[el.lat, el.lon, el.country]}>
                  {el.name} - {el.country} {el.lat} -- {el.lon}
                </option>
              );
            })}
          </select>
          <button onClick={handleSearchCity}>Seleccionar</button>
        </div>
      )}
    </>
  );
};
