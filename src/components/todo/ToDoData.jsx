const ToDoData = (props) => {
    const data = props.data;
    console.log(props.todoList)
    return (
        <div className="todo-data">
            <div>{data.name}-{data.age}</div>
            <div>LEarning ReactJS</div>
            <div>Watching youtube</div>
            <div>{JSON.stringify(props.todoList)}</div>
        </div>
    );
}

export default ToDoData;