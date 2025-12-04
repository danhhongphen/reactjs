import React, { useState } from "react";
import { Button, Input, notification, Modal } from 'antd';
import { CreateUserAPI } from "../service/api.service";

const UserFormComponent = (props) => {
    const { fetchUsers } = props;
    const [api, contextHolder] = notification.useNotification();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleSubmitCreateUserButton = async () => {
        const response = await CreateUserAPI(fullName, email, password, phoneNumber);
        if (response.data) {
            api.success({
                message: "Create user successfully",
                description: `User ${fullName} created successfully`,
                placement: 'topRight'
            });
            resetAndCloseModal();
            fetchUsers();
        }
        else {
            api.error({
                message: "Create user failed",
                description: response.message || "Failed to create user",
                placement: 'topRight'
            });
        }
    }

    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setIsModelOpen(false);
    }

    return (
        <>
            {contextHolder}
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>User Table</h3>
                    <div>
                        <Button type="primary"
                            onClick={() => { setIsModelOpen(true); }}
                        >Create User</Button>
                    </div>
                </div>
                <Modal
                    title="Create User"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => { handleSubmitCreateUserButton(false) }}
                    onCancel={() => { resetAndCloseModal() }}
                    maskClosable={false}
                    okText="Create"
                >
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>Full name:</span>
                            <Input
                                value={fullName}
                                onChange={(event) => { setFullName(event.target.value) }} />
                        </div>
                        <div>
                            <span>Email:</span>
                            <Input
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </div>
                        <div>
                            <span>Password:</span>
                            <Input.Password
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div>
                            <span>Phone:</span>
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

export default UserFormComponent;