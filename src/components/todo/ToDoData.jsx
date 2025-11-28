const ToDoData = (props) => {
    const data = props.data;
    console.log(props.todoList);
    const removeToDoFunc = props.removeToDoFunc;

    const deleteTodoItem = (id) => {
        console.log(`delete id ` + id);
        removeToDoFunc(id);
    }

    return (
        <div className="todo-data">
            {props.todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button onClick={() => { deleteTodoItem(item.id) }}>Delete</button>
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