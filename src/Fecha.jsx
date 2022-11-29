import React from 'react'

export const Fecha = ({day, number, month, year}) => {
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
    <div className="date">
    <p>
      {days[day]}  {number} de {months[month]} de {year} 
    </p>
  </div>
  )
}
