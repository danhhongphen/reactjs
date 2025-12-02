import { Button, message, Popconfirm } from "antd";
import React from "react";
import { DeleteUserAPI } from "../service/api.service";

const DeleteUserComponent = (props) => {
    const { dataDelete, setDataDelete, fetchUsers } = props;

    const [messageApi, holder] = message.useMessage();
    const confirm = async (e) => {
        console.log(e);
        if (!dataDelete) {
            messageApi.success('Not found any data to delete');
        }
        messageApi.success('Click on Yes');

        const response = await DeleteUserAPI(dataDelete._id);
        console.log(response);
        fetchUsers();
    };
    const cancel = e => {
        console.log(e);
        messageApi.error('Click on No');
        setDataDelete(null);
    };
    return (
        <>
            {holder}
            <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Delete</Button>
            </Popconfirm>
        </>
    );
}

export default DeleteUserComponent;