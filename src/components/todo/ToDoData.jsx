const ToDoData = (props) => {
    const data = props.data;
    console.log(props.todoList)
    return (
        <div className="todo-data">
            {props.todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
            {/* <div>{data.name}-{data.age}</div>
            <div>LEarning ReactJS</div>
            <div>Watching youtube</div>
            <div>{JSON.stringify(props.todoList)}</div> */}
        </div>
    );
}

export default ToDoData;