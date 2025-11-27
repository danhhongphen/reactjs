import { useState } from "react";


const ToDoNew = (props) => {
    const [valueInput, setValueInput] = useState("Phanh");
    const addNewToDoFunc = props.addNewToDoFunc;
    const handleClick = () => {
        console.log("input" + valueInput)
    }

    const handleOnChange = (text) => {
        console.log(text);
        setValueInput(text);
    }



    // addNewToDoFunc("cam");
    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => { handleOnChange(event.target.value) }}
            ></input>
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            <div>{valueInput}</div>
        </div>
    );
}

export default ToDoNew;