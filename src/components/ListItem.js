import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import { Timer } from "./Timer";

export const ListItem = ({
  data,
  deleteItemFunction,
  editItemFunction,
  pauseTimerFunc,
  startTimerFunc,
  resetTimerFunc,
  updateTimer,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(data.description);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [eta, setEta] = useState(data.timeRemaining);

  const handleEdit = () => {
    if (isEditable) {
      data.description = name;
      data.timeRemaining = eta;
      data.timeToComplete = eta;
      editItemFunction(data);
    }
    setIsEditable(!isEditable);
  };

  const startTimer = () => {
    setIsTimerActive(!isTimerActive);
    startTimerFunc(data.id);
  };

  const css = { marginTop: "10px", padding: ".375rem .75rem", width:"inherit" };

  const getNormalButtons = () => {
    return (
      <>
        <Col md={2}>
          <Button variant="warning" onClick={startTimer}>
            Start
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="info" onClick={handleEdit}>
            {isEditable ? "Save" : "Edit"}
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="dark" onClick={() => deleteItemFunction(data.id)}>
            Delete
          </Button>
        </Col>
      </>
    );
  };

  return (
    <li>
      <Row>
        {!isEditable ? (
          <>
            <Col>
              <p style={css}>{data.description}</p>
            </Col>
            <Col md={2} sm={2}>
              <p style={css}>ETA: {data.timeRemaining}</p>
            </Col>
          </>
        ) : (
          <>
          <Col md={4}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={css}
            ></input>
          </Col>
          <Col md={2}>
          <input
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              style={css}
            ></input>
          </Col>
          </>
        )}
        {data.isTimerActive ? (
          <Timer
            data={data}
            deleteItemFunction={deleteItemFunction}
            pauseTimerFunc={pauseTimerFunc}
            resetTimerFunc={resetTimerFunc}
            updateTimer={updateTimer}
          />
        ) : (
          getNormalButtons()
        )}
      </Row>
    </li>
  );
};
