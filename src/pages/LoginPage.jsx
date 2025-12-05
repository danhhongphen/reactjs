import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../components/service/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContextComponent";


const LoginPage = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState("");
    const { setUser } = useContext(AuthContext);

    const onFinish = async values => {
        console.log("login: " + JSON.stringify(values));
        setLoading(true);
        const response = await LoginApi(values.email, values.password);
        if (response.data) {
            setUser(response.data.user);
            localStorage.setItem("access_token", response.data.access_token);
            message.success({
                message: "Login successfully",
            });
            navigate("/");
        }
        else {
            api.error({
                message: "Login failed",
            });
        }
        setLoading(false);
    };
    return (
        <>
            {contextHolder}
            <Row>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Login</legend>
                        <Form
                            form={form}
                            layout="vertical"
                            // name="basic"
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Row>
                                <Col>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!'
                                            },
                                            {
                                                type: 'email',
                                                message: 'Please enter a valid email!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={
                                            [{
                                                required: true,
                                                message: 'Please input your password!'
                                            }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <Button
                                                loading={loading}
                                                type="primary"
                                                htmlType="submit">
                                                Register
                                            </Button>
                                            <Link to={"/"}> Go to homepage</Link >
                                        </div>
                                        <div>
                                            <Divider />
                                            <Link to={"/register"}> or Register now!</Link >
                                        </div>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form >
                    </fieldset>
                </Col>
            </Row>
        </>
    );
}

export default LoginPage;