import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { ListItem } from "./ListItem";

export const List = ({data, deleteItemFunction, editItemFunction, pauseTimerFunc, startTimerFunc, resetTimerFunc, updateTimer}) => {
  return (
    <ul className="mt-4 list-unstyled">
      {data.map((item) => (
        <ListItem
          key={item.id}
          data={item}
          deleteItemFunction={deleteItemFunction}
          editItemFunction={editItemFunction}
          pauseTimerFunc={pauseTimerFunc}
          startTimerFunc={startTimerFunc}
          resetTimerFunc={resetTimerFunc}
          updateTimer={updateTimer}
        />
      ))}
    </ul>
  );
};
