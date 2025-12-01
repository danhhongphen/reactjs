import React, { useState } from "react";
import { Button, Input, notification } from 'antd';
import { CreateUserAPI } from "../service/api.service";

const UserFormComponent = () => {
    const [api, contextHolder] = notification.useNotification();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleCreateUserButton = async () => {
        const response = await CreateUserAPI(fullName, email, password, phoneNumber);
        console.log("API Response:", response);
        if (response.data) {
            api.success({
                message: "Create user successfully",
                description: `User ${fullName} created successfully`,
                placement: 'topRight'
            });
        }
        else {
            api.error({
                message: "Create user failed",
                description: response.message || "Failed to create user",
                placement: 'topRight'
            });
        }
    }

    return (
        <>
            {contextHolder}
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
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
                    <div>
                        <Button type="primary"
                            onClick={() => { handleCreateUserButton() }}
                        >Create User</Button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default UserFormComponent;