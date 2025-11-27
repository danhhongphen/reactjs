
const ToDoNew = (props) => {
    const addNewToDoFunc = props.addNewToDoFunc;
    const handleClick = () => {
        alert("click");
    }

    const handleOnChange = (text) => {
        console.log(text)
    }

    addNewToDoFunc("cam");
    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => { handleOnChange(event.target.value) }}
            ></input>
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default ToDoNew;