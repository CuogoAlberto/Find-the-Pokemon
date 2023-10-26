import React from 'react'
import { useState, useEffect } from 'react'

export default function TimerButton(props) {

  const [isActive, setIsActive] = useState(false)
  
  const [seconds, setSeconds] = useState(0)
  
  const [bestTime, setBestTime] = useState(null)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // Format Time
  const formatTime = (value) => (value < 10 ? `0${value}` : value)

  
  // TIMER
  useEffect(() => {
    let timer

    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isActive])

  // Hidden Timer for 0/1292 Pokemon catched
  useEffect(() => {
    if (props.catchCount > 0) {
      setIsActive(true)
    }
  }, [props.catchCount])

  // Save time for complete pokedex
  useEffect(() => {
    if (props.catchCount === 2) {
      handleButtonClick()
    }
  }, [props.catchCount])

  // Reset Timer
  useEffect(() => {
      if (props.resetTimer) {
      setBestTime(null) // Set Best Time => 'null'
      props.setResetTimer(false) // Return Reset Timer on 'false'
      setIsActive(false) // Stop Timer
      setSeconds(0) // Set Seconds => '0'
      }
  }, [props.resetTimer])

  // Stop Timer
  const handleButtonClick = () => {
    if(!isActive) {
        setSeconds(0)
    }

    const time = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`

    setBestTime(time)
    setIsActive(!isActive)
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">

      {props.catchCount === props.pokedex ? (
        <></>
      ) : (
        <>
          {/* TIMER */}
          <button onClick={handleButtonClick} className={`btn ${isActive ? 'btn-danger' : 'btn-primary'} fw-bold`}>
            {isActive ? `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}` : 'Start Timer'}
          </button>
        </>
      )}

      {/* BEST TIME */}
      {bestTime && bestTime !== '00:00:00' ? (<p className='mb-0'>Last Time: {bestTime}</p>) : ''}

    </div>
  )
}