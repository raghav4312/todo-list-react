import './App.css';
import {useState, useEffect} from 'react'
import { List } from './components/List';
import { SearchBar } from './components/SearchBar';
import { AddItem } from './components/AddItem';

function App() {
  const [tasks, setTasks] = useState([
    { id: 123, description: "This is task 1", isTimerActive:false ,timeToComplete:25, timeRemaining:25, isPaused:false},
    { id: 234, description: "hi there task here", isTimerActive:false, timeToComplete:25, timeRemaining:25, isPaused:false},
  ]);

  const [searchTasks, setSearchTasks] = useState(tasks);
  const [searchKey, setSearchKey] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setSearchTasks(tasks.filter(task => task.description.toLowerCase().includes(searchKey)));
  }, [searchKey, tasks])

  const deleteItemFunc = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editItemFunc = (item) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((ele) => {
      if (ele.id === item.id) {
        ele.description = item.description;
      }
    });
    setTasks(tasksCopy);
  };

  const search = e => {
    setSearchKey(e.target.value);
  }

  const add = item => {
    setTasks([...tasks,item]);
  }

  const startTimer = (id) => {
    setIsTimerRunning(true);
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.isTimerActive = true;
      } else {
        task.isTimerActive = false;
      }
    });
    setTasks(tasksCopy);
  }

  const updateTimer = (id, time) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.timeRemaining = time
      }
    });
    setTasks(tasksCopy);
  }

  const pauseTimer = (id, time) => {
    setIsTimerRunning(!isTimerRunning);
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.isPaused = !task.isPaused;
        task.timeRemaining = time
      }
    });
    setTasks(tasksCopy);
  }

  const resetTimer = (id) => {
    setIsTimerRunning(false);
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.isTimerActive = false;
        task.timeRemaining = task.timeToComplete;
      }
    });
    setTasks(tasksCopy);
  }

  return (
    <div className="container" style={{width:"100vw"}}>
      <h1>To-Do List</h1>
      <SearchBar searchFunction={search}/>
      <List
        data={searchTasks}
        deleteItemFunction={deleteItemFunc}
        editItemFunction={editItemFunc}
        pauseTimerFunc={pauseTimer}
        startTimerFunc={startTimer}
        resetTimerFunc={resetTimer}
        updateTimer={updateTimer}
      />
      {!isTimerRunning && <AddItem addTask={add}/>}
    </div>
  );
}

export default App;
