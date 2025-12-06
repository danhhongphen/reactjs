import React, { useContext } from "react";
import { AuthContext } from "../components/context/AuthContextComponent";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (!user || !user.id) {
        return (
            <>
                <Result
                    status="403"
                    title="Unauthorized"
                    subTitle="Sorry, you need to login to access this page."
                    extra={
                        <Link to="/login">
                            <Button type="primary">Go to login page</Button>
                        </Link>
                    }
                />
            </>
        );
    }
    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;