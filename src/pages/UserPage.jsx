import UserFormComponent from "./../components//user//UserFormComponent";
import UserTableComponent from "./../components/user/UserTableComponent";
import { FetchAllUserAPI } from "./../components/service/api.service.js";
import React, { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    const [current, setCurrent] = useState("1");
    const [pageSize, setPageSize] = useState("10");
    const [total, setTotal] = useState(0);

    const fetchUsers = async () => {
        console.log("run fetch users");
        const response = await FetchAllUserAPI(current, pageSize);
        if (response.data) {
            setDataUser(response.data.result);
            if (+current !== +response.data.meta.current) {
                setCurrent(response.data.meta.current);
            }
            if (+pageSize !== +response.data.meta.pageSize) {
                setPageSize(response.data.meta.pageSize);
            }
            setTotal(response.data.meta.total);
        }
    };

    useEffect(() => {
        console.log("useEffect")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, [current, pageSize]);

    console.log("render....")

    return (
        <>
            <div>
                <UserFormComponent fetchUsers={fetchUsers} />
                <UserTableComponent
                    dataUser={dataUser}
                    fetchUsers={fetchUsers}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    setTotal={setTotal}
                />
            </div>
        </>
    );
}

export default UserPage;