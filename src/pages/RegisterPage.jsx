import { Form, Button, Input, notification, Row, Col } from "antd";
import { RegisterUserAPI } from "../components/service/api.service";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async values => {
        console.log(values);
        const response = await RegisterUserAPI(values.fullName, values.email, values.password, values.phone);
        if (response.data) {
            api.success({
                message: "Register user successfully",
                description: `User ${values.fullName} create successfully`,
                placement: 'topRight'
            });
            navigate("/login");
        }
        else {
            api.success({
                message: "Register user error",
                description: `User ${values.fullName} create failed`,
                placement: 'topRight'
            });
        }
    };
    // const onReset = () => {
    //     form.resetFields();
    // };
    // const onFill = () => {
    //     form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    // };

    return (
        <>
            {contextHolder}

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
                    <Col xm={24} md={8}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xm={24} md={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xm={24} md={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true, message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xm={24} md={8}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!'
                                },
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}

export default RegisterPage;