import React from 'react'
import './index.css'

export default function ToDo({todo, toggleToDo}) {
    function handleToDoClick(){
        toggleToDo(todo.id)
    }

    let toggled = todo.complete ? "complete" : "incomplete"

  return (
    <div>
        <label id='tasks' class = { toggled }>
        <input type= "checkbox" checked = {todo.complete} onChange = {handleToDoClick} />
        {todo.name}
        </label>

    </div>
  )
}
