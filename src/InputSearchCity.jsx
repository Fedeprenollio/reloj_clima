import React from "react";
import axios from "axios";

export const InputSearchCity = ({
  input,
  setDataArray,
  setData,
  dataArray,
}) => {
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
      .then((res) => {
        if (res.data.length === 0) {
          alert("Ciudad no econtrada");
        }
        setDataArray(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container container-search">
      <form onSubmit={handleSubmit}>
        <input className="searchCity" type="search" ref={input} placeholder="Ingresa una ciudad" />
        <button>Buscar ciudad</button>
      </form>
    </div>
  );
};
