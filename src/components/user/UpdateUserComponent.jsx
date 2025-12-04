import React, { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { UpdateUserAPI } from "../service/api.service";

const UpdateUserComponent = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const { isModalUpdateOpen, setIsModelUpdateOpen, dataUpdate, setDataUpdate, fetchUsers } = props;
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhoneNumber(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitUpdateUserButton = async () => {
        const response = await UpdateUserAPI(id, fullName, phoneNumber);
        if (response.data) {
            api.success({
                message: "Update user successfully",
                description: `User ${fullName} update successfully`,
                placement: 'topRight'
            });
            resetAndCloseModal();
            fetchUsers();
        }
        else {
            api.error({
                message: "Update user failed",
                description: response.message || "Failed to update user",
                placement: 'topRight'
            });
        }
    }

    const resetAndCloseModal = () => {
        setFullName("");
        setId("");
        setPhoneNumber("");
        setIsModelUpdateOpen(false);
        setDataUpdate(null);
    }

    return (
        <>
            <div>
                {contextHolder}
                <Modal
                    title="Update User"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalUpdateOpen}
                    onOk={() => { handleSubmitUpdateUserButton(false) }}
                    onCancel={() => { resetAndCloseModal() }}
                    maskClosable={false}
                    okText="Update"
                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Id:</span>
                            <Input
                                value={id}
                                disabled />
                        </div>
                        <div>
                            <span>Full name:</span>
                            <Input
                                value={fullName}
                                onChange={(event) => { setFullName(event.target.value) }} />
                        </div>
                        <div>
                            <span>Phone:</span >
                            <Input
                                value={phoneNumber}
                                onChange={(event) => { setPhoneNumber(event.target.value) }} />
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default UpdateUserComponent;