import React from 'react'
import axios from "axios";


export const InputSearchCity = ({input,setDataArray,setData}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({});
    
        //BUSCAMOS EL NOMBRE DE LA CIUDAD:
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${
              input.current.value
            }&limit=8&appid=${import.meta.env.VITE_API_KEY}&lang=sp`
          )
          .then((res) => setDataArray(res.data));
      };


  return (
    <form onSubmit={handleSubmit}>
    <input ref={input} type="text" placeholder="Ingresa una ciudad" />
    <button>Buscar ciudad</button>
  </form>
  )
}
