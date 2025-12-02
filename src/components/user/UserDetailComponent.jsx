import { Drawer } from "antd";
import React, { useEffect } from "react";


const UserDetailComponent = (props) => {
    const { open, setOpen, dataDetail, setDataDetail } = props;

    console.log("detail Data: " + dataDetail);
    return (
        <>
            <Drawer
                title="User detail"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setOpen(false);
                    setDataDetail(null);
                }}
                open={open}
                mask={false}
            >
                {dataDetail ? <>
                    <p>ID: {dataDetail._id}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Full Name: {dataDetail.fullName}</p>
                    <p>Phone: {dataDetail.phone}</p>
                </>
                    :
                    <div>No data</div>
                }

            </Drawer>
        </>
    );
}

export default UserDetailComponent;