
import "./components/todo/todo.css"
import ToDoData from "./components/todo/ToDoData"
import ToDoNew from "./components/todo/ToDoNew"
import reactImage from "./assets/react.svg"
import { useState } from "react"

function App() {
  const data = {
    "name": "cam",
    "age": 1
  }

  const addNewToDoFunc = (name) => {
    alert(`hello ${name}`)
  }

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Learning React"
    },
    {
      id: 2,
      name: "Watching Youtube"
    }
  ])

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <ToDoNew addNewToDoFunc={addNewToDoFunc} />
      <ToDoData data={data} todoList={todoList} />
      <div className="todo-image">
        <img src={reactImage} className="logo" />
      </div>
    </div>
  )
}

export default App
