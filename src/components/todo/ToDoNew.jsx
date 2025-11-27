
const ToDoNew = (props) => {
    const addNewToDoFunc = props.addNewToDoFunc;

    addNewToDoFunc("cam");
    return (
        <div className="todo-new">
            <input type="text"></input>
            <button>Add</button>
        </div>
    );
}

export default ToDoNew;