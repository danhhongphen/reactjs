
import "./todo.css"
import ToDoData from "./ToDoData"
import ToDoNew from "./ToDoNew"
import reactImage from "./../../assets/react.svg"
import { useState } from "react"

const ToDoApp = () => {
    const data = {
        "name": "cam",
        "age": 1
    }

    const randomIntFromInterval = (min, max) => { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const addNewToDoFunc = (name) => {
        const newTodo = {
            "id": randomIntFromInterval(10, 10000),
            "name": name
        }

        setTodoList([...todoList, newTodo])
    }

    const removeToDoFunc = (id) => {
        const afterRemove = todoList.filter(item => item.id !== id);
        setTodoList(afterRemove);
    }

    const [todoList, setTodoList] = useState([])

    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <ToDoNew addNewToDoFunc={addNewToDoFunc} />
                {todoList.length > 0 ?
                    <ToDoData data={data} todoList={todoList} removeToDoFunc={removeToDoFunc} />
                    :
                    <div className="todo-image">
                        <img src={reactImage} className="logo" />
                    </div>
                }
            </div>
        </>
    );
}

export default ToDoApp;