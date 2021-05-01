import Button from "react-bootstrap/Button";
import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid';

export const AddItem = ({addTask}) => {
  const [isAddEnabled, setIsAddEnabled] = useState(false)
  const [desc, setDesc] = useState('')
  const [eta, setEta] = useState(25)

  const handleAddTask = () => {
    setIsAddEnabled(!isAddEnabled);
    const item = {
      id: uuidv4(),
      description : desc,
      timeToComplete : eta,
      timeRemaining : eta,
      isTimerActive : false,
      isPaused : false
    }
    addTask(item);
    setDesc('');
  }

  const handleCancel = () => {
    setIsAddEnabled(!isAddEnabled);
    setDesc('');
  }
  return (
    <div>
      {
      isAddEnabled ?
      <Form>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" onChange={e=>setDesc(e.target.value)} placeholder="Add Description"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>ETA (in Seconds)</Form.Label>
          <Form.Control type="number" onChange={e=>setEta(e.target.value)} value={eta}/>
        </Form.Group>
        <Button variant="success" onClick={handleAddTask}>Add</Button>
        <Button variant="danger" onClick={handleCancel}>Cancel</Button>
      </Form>
      :
      <Button onClick={()=>setIsAddEnabled(!isAddEnabled)}>Add Task</Button>
      }
    </div>
  )
}
