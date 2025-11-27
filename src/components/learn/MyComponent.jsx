import "./style.css"

const MyComponent = () => {
    const heo = "heo"
    return (
        <>
            <div className="phanh" style={{ borderRadius: "50px" }}>{heo} & Phanh & Thuy</div>
            <div className="abc">abc</div>
        </>
    );
}

export default MyComponent;