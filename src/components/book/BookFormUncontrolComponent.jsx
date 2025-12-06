import React, { useState } from "react";
import { Button, Input, notification, Modal, Select, Form, Image, Row, Col, Divider, Upload } from 'antd';
import { CreateBookAPI, UploadFileAPI } from "../service/api.service";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const BookFormUnControlComponent = (props) => {
    const { fetchBooks } = props;
    const [api, contextHolder] = notification.useNotification();
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [author, setAuthor] = useState("");
    // const [category, setCategory] = useState("");



    const [isModalOpen, setIsModelOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const onFinish = () => {
        form.submit();
    }

    const handleSubmitCreateBookButton = async (values) => {
        console.log("un control create book: ", JSON.stringify(values));
        if (!selectedFile) {
            api.error({
                message: "Upload thumbnail is required"
            });
            return;
        }
        const response = await UploadFileAPI(selectedFile, "book");

        if (!response.data) {
            api.error({
                message: "Upload thumbnail failed",
                description: JSON.stringify(response.message)
            });
            return;
        }

        const responseCreateBook = await CreateBookAPI(values.name, +values.price, +values.quantity, values.author, values.category, response.data.fileUploaded);
        if (responseCreateBook.data) {
            api.success({
                message: "Create book successfully",
                description: `Book ${values.name} created successfully`,
                placement: 'topRight'
            });
            resetAndCloseModal();
            fetchBooks();
        }
        else {
            api.error({
                message: "Create book failed",
                description: responseCreateBook.message || "Failed to create book",
                placement: 'topRight'
            });
        }
    }

    const resetAndCloseModal = () => {
        form.resetFields();
        setIsModelOpen(false);
        setPreview(null);
        setSelectedFile(null);
        setFileList([]);
    }

    const onSelectFile = (info) => {
        console.log("on selected file", info);

        // Get the original file object
        const file = info.file.originFileObj || info.file;

        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreview(null);
        }
    }

    const onSearchCategory = (value) => {
        console.log("search category: ", value);
    }

    const onChangeCategory = (value) => {
        console.log("change category: ", value)
        // setCategory(value);
    }

    return (
        <>
            {contextHolder}
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Book Table</h3>
                    <div>
                        <Button type="primary"
                            onClick={() => { setIsModelOpen(true); }}
                        >Create Book</Button>
                    </div>
                </div>
                <Modal
                    title="Create book"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => { onFinish() }}
                    onCancel={() => { resetAndCloseModal() }}
                    maskClosable={false}
                    okText="Create"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        // name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={handleSubmitCreateBookButton}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Full Name: "
                                    name="name"
                                    rules={[{ required: true, message: 'Please input book name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Price: "
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input book price!'
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
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Quantity: "
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input book quantity!'
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
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Author: "
                                    name="author"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input book author!'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Category: "
                                    name="category"
                                    rules={[{ required: true, message: 'Please input book category!' }]}
                                >
                                    <Select
                                        showSearch={{ optionFilterProp: 'label', onSearchCategory }}
                                        placeholder="Select a Category"
                                        onChange={onChangeCategory}
                                        options={[
                                            { value: 'Arts', label: 'Arts' },
                                            { value: 'Business', label: 'Business' },
                                            { value: 'Comics', label: 'Comics' },
                                            { value: 'Cooking', label: 'Cooking' },
                                            { value: 'Entertainment', label: 'Entertainment' },
                                            { value: 'History', label: 'History' },
                                            { value: 'Music', label: 'Music' },
                                            { value: 'Sports', label: 'Sports' },
                                            { value: 'Teen', label: 'Teen' },
                                            { value: 'Travel', label: 'Travel' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Upload thumbnail"
                                >
                                    <Upload
                                        fileList={fileList}
                                        onChange={onSelectFile}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        accept="image/*"
                                    >
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        {preview && <Row>
                            <Col>
                                <Form.Item
                                    style={{
                                        marginTop: "10px",
                                        height: "100px", width: "150px"
                                    }}>
                                    <Image
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        width={"100%"}
                                        alt="basic"
                                        src={preview} />
                                </Form.Item>
                            </Col>
                        </Row>}
                    </Form >
                </Modal>
            </div>
        </>
    );
}

export default BookFormUnControlComponent;