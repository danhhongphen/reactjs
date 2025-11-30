import UserFormComponent from "../components/user/UserFormComponent";
import UserTableComponent from "../components/user/UserTableComponent";
import React from 'react';

const UserPage = () => {
    return (
        <>
            <div>
                <UserFormComponent />
                <UserTableComponent />
            </div>
        </>
    );
}

export default UserPage;