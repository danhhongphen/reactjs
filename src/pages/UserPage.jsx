import UserFormComponent from "./../components//user//UserFormComponent";
import UserTableComponent from "./../components/user/UserTableComponent";
import { FetchAllUserAPI } from "./../components/service/api.service.js";
import React, { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        console.log("useEffect")
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        console.log(">> Before fetch users");
        const response = await FetchAllUserAPI();
        console.log(">> AFTER fetch users ", response.data);
        setDataUser(response.data);
    };

    console.log("render....")

    return (
        <>
            <div>
                <UserFormComponent fetchUsers={fetchUsers} />
                <UserTableComponent dataUser={dataUser} fetchUsers={fetchUsers} />
            </div>
        </>
    );
}

export default UserPage;