const ToDoData = (props) => {
    const data = props.data;
    return (
        <div className="todo-data">
            <div>{data.name}-{data.age}</div>
            <div>LEarning ReactJS</div>
            <div>Watching youtube</div>
        </div>
    );
}

export default ToDoData;