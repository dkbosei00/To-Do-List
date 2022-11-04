import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import { v4 as uuidv4 } from 'uuid';
import './styles/index.css';

const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

function App() {
  const [todos, setTodos] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : []
  );
  const toDoName = useRef();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }, []);

  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('add').click();
    }
  });

  function toggleToDo(id) {
    const newToDos = [...todos];
    const todo = newToDos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newToDos);
  }

  function handleAddToDo(e) {
    const name = toDoName.current.value;
    if (name === '') return;
    setTodos((prevToDos) => {
      return [...prevToDos, { id: uuidv4(), name: name, complete: false }];
    });

    toDoName.current.value = null;
  }

  console.log(todos);

  function handleClearToDo() {
    const newToDos = todos && todos.filter((todo) => !todo.complete);
    setTodos(newToDos);
  }
  return (
    <>
      <ToDoList todos={todos} toggleToDo={toggleToDo} />
      <input id="toDoName" ref={toDoName} type="text" />
      <button onClick={handleAddToDo} id="add">
        Add To-Do
      </button>
      <button onClick={handleClearToDo}>Clear Completed</button>
      <div>{todos && todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
