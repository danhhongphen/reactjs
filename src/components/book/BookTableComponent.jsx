import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Popconfirm, Table } from "antd";
import { useState } from "react";
import BookDetailComponent from "./BookDetailComponent";


const BookTableComponent = (props) => {
    const { dataBook, fetchBooks, current, setCurrent, pageSize, setPageSize, total, setTotal } = props;
    const [isModalUpdateOpen, setIsModelUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [open, setOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataDelete, setDataDelete] = useState(null);
    const [messageApi, holder] = message.useMessage();

    const confirm = async (e) => {
        console.log(e);
        // if (!dataDelete) {
        //     messageApi.success('Not found any data to delete');
        // }

        // const response = await DeleteUserAPI(dataDelete._id);
        // if (response.data && response.data.deletedCount > 0) {
        //     messageApi.success('Delete user successfully');
        //     await fetchUsers();
        // }
        // else {
        //     messageApi.error(response.message);
        // }

    };
    const cancel = e => {
        console.log(e);
        setDataDelete(null);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <>
                    <a onClick={() => {
                        setDataDetail(record);
                        setOpen(true);
                    }}>
                        {record._id}
                    </a>
                </>
            )
        },
        {
            title: 'Name',
            dataIndex: 'mainText'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModelUpdateOpen(true);
                            }}
                        />
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined
                                onClick={() => {
                                    setDataDelete(record);
                                }}
                                style={{ cursor: "pointer", color: "red" }}
                            />
                        </Popconfirm>
                    </div>
                </>
            ),
        }
    ];

    const onChangeTable = (pagination, filters, sorter, extra) => {
        console.log("paging on change");
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(pagination.pageSize);
            }
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChangeTable}
            />
            {/* <UpdateUserComponent
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModelUpdateOpen={setIsModelUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchBooks={fetchBooks}
            /> */}
            <BookDetailComponent
                open={open}
                setOpen={setOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                fetchBooks={fetchBooks}
            />
            {/* <DeleteUserComponent
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchUsers={fetchUsers}
            /> */}

            {holder}
        </>
    );
}

export default BookTableComponent;