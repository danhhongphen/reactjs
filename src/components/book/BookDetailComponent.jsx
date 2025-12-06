import { Button, Drawer, notification } from "antd";
import React, { useState } from "react";
import { UpdateUserAPI, UploadFileAPI } from "../service/api.service";


const BookDetailComponent = (props) => {
    const { open, setOpen, dataDetail, setDataDetail, fetchBooks } = props;
    const [api, contextHolder] = notification.useNotification();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const onSaveAvatar = async () => {
        if (!selectedFile) {
            return;
        }
        const response = await UploadFileAPI(selectedFile, "book");

        if (!response.data) {
            api.error({
                message: "Upload book failed",
                description: JSON.stringify(response.message)
            });
            return;
        }

        const updateUserAvatarResponse = await UpdateUserAPI(dataDetail._id, dataDetail.fullName, dataDetail.phone, response.data.fileUploaded);
        if (updateUserAvatarResponse.data) {
            api.success({
                message: "Upload book successfully",
                description: JSON.stringify(updateUserAvatarResponse.message)
            });
            setOpen(false);
            setPreview(null);
            setSelectedFile(null);
            await fetchBooks();
        }
        else {
            api.error({
                message: "Upload book failed",
                description: JSON.stringify(updateUserAvatarResponse.message)
            });
        }

    }

    return (
        <>
            {contextHolder}
            <Drawer
                width={"40vw"}
                title="User detail"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setOpen(false);
                    setDataDetail(null);
                }}
                open={open}
                mask={false}
            >
                {dataDetail ?
                    <>
                        <div>
                            <p>ID: {dataDetail._id}</p>
                            <p>Name: {dataDetail.mainText}</p>
                            <p>Price: {dataDetail.price}</p>
                            <p>Quantity: {dataDetail.quantity}</p>
                        </div>
                        <div style={{
                            marginTop: "10px",
                            height: "100px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
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
                                Upload book image
                            </label>
                            <input
                                type="file"
                                hidden id="btnUploadAvatar"
                                onChange={(event) => { onSelectFile(event) }}>
                            </input>
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    height: "100px", width: "150px"
                                }}>
                                    <img
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        onClick={() => { onSaveAvatar() }}>Save</Button>
                                </div>
                            </>
                        }
                    </>
                    :
                    <div>No data</div>
                }

            </Drawer>
        </>
    );
}

export default BookDetailComponent;