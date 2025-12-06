import React, { useState } from "react";
import { Button, Input, notification, Modal, InputNumber, Select } from 'antd';
import { CreateBookAPI, CreateUserAPI, UploadFileAPI } from "../service/api.service";

const BookFormComponent = (props) => {
    const { fetchBooks } = props;
    const [api, contextHolder] = notification.useNotification();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitCreateBookButton = async () => {
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

        const responseCreateBook = await CreateBookAPI(name, price, quantity, author, category, response.data.fileUploaded);
        if (responseCreateBook.data) {
            api.success({
                message: "Create book successfully",
                description: `Book ${name} created successfully`,
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
        setName("");
        setPrice("");
        setQuantity("");
        setAuthor("");
        setCategory("");
        setIsModelOpen(false);
        setPreview(null);
        setSelectedFile(null);
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const onSearchCategory = (value) => {
        console.log("search category: ", value)
    }

    const onChangeCategory = (value) => {
        setCategory(value);
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
                    onOk={() => { handleSubmitCreateBookButton(false) }}
                    onCancel={() => { resetAndCloseModal() }}
                    maskClosable={false}
                    okText="Create"
                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Name:</span>
                            <Input
                                value={name}
                                onChange={(event) => { setName(event.target.value) }} />
                        </div>
                        <div>
                            <span>Price:</span>
                            <br />
                            <InputNumber
                                style={{ width: '100%' }}
                                value={price}
                                onChange={(value) => { setPrice(value) }} />
                        </div>
                        <div>
                            <span>Quantity:</span>
                            <br />
                            <InputNumber
                                suffix="đ"
                                style={{ width: '100%' }}
                                value={quantity}
                                onChange={(value) => { setQuantity(value) }} />
                        </div>
                        <div>
                            <span>Author:</span>
                            <Input
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }} />
                        </div>
                        <div>
                            <span>Category:</span>
                            <br />
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
                        </div>
                        <div>
                            <label htmlFor="btnUploadAvatar"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}>
                                Upload thumbnail
                            </label>
                            <input
                                type="file"
                                hidden id="btnUploadAvatar"
                                onChange={(event) => { onSelectFile(event) }}>
                            </input>
                        </div>

                        {preview &&
                            <div style={{
                                marginTop: "10px",
                                height: "100px", width: "150px"
                            }}>
                                <img
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        }
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default BookFormComponent;