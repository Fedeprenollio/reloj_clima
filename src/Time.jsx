import React from 'react'

export const Time = ({hour,minutes,seconds}) => {
  return (
    <div className="time">
    <p className="hour time-border">{hour} </p>
    <p className="minute time-border">:</p>
    <p className="minute time-border">{minutes}</p>
    <p className="minute time-border">:</p>
    <p className="second time-border">{seconds} </p>
  </div>
  )
}
