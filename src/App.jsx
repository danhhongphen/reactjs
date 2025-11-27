
import "./components/todo/todo.css"
import ToDoData from "./components/todo/ToDoData"
import ToDoNew from "./components/todo/ToDoNew"
import reactImage from "./assets/react.svg"

function App() {
  const data = {
    "name": "cam",
    "age": 1
  }

  const addNewToDoFunc = (name) => {
    alert(`hello ${name}`)
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <ToDoNew addNewToDoFunc={addNewToDoFunc} />
      <ToDoData data={data} />
      <div className="todo-image">
        <img src={reactImage} className="logo" />
      </div>
    </div>
  )
}

export default App
