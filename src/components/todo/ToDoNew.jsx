import { useState } from "react";


const ToDoNew = (props) => {
    const [valueInput, setValueInput] = useState("Phanh");
    const addNewToDoFunc = props.addNewToDoFunc;
    const handleClick = () => {
        addNewToDoFunc(valueInput);
        setValueInput("");
    }

    const handleOnChange = (text) => {
        setValueInput(text);
    }

    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => { handleOnChange(event.target.value) }}
                value={valueInput}
            ></input>
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default ToDoNew;