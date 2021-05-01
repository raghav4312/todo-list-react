import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

export const Timer = ({
  data,
  deleteItemFunction,
  pauseTimerFunc,
  resetTimerFunc,
  updateTimer
}) => {
  const [timeLeft, setTimeLeft] = useState(data.timeRemaining);
  const [isPaused, setIsPaused] = useState(false);

  const pause = () => {
    setIsPaused(!isPaused);
    pauseTimerFunc(data.id, timeLeft);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(!isPaused && timeLeft > 0) {
        updateTimer(data.id, timeLeft-1);
        setTimeLeft(timeLeft -1);
      }
    },1000)
    return () => {
      clearInterval(interval);
    }
  },[timeLeft, isPaused])

  return (
    <>
      {
        timeLeft > 0 ? 
        <>
        <Col md={2}>
          <Button variant="light">{timeLeft} sec left</Button>
        </Col>
        <Col md={2}>
          <Button variant="warning" onClick={pause}>{isPaused ? "Start" : "Pause"}</Button>
        </Col>
        </>:
        <Col md={2}>
          <Button variant="info" onClick={()=>deleteItemFunction(data.id)}>Delete</Button>
        </Col>
      }
      <Col md={2}>
        <Button onClick={() => resetTimerFunc(data.id)}>Reset</Button>
      </Col>
    </>
  )
}
