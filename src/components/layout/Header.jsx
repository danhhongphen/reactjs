import { Link, NavLink } from "react-router-dom";
import { AliwangwangOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Children, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextComponent";

const Header = () => {
    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);
    console.log("check context data on header: " + JSON.stringify(user));

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'user',
            icon: <AppstoreOutlined />
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'book',
            icon: <SettingOutlined />,

        },
        ...(!user.id ? [{
            label: <Link to="/login">Login</Link>,
            key: 'book',
            icon: <SettingOutlined />,

        }] : []),
        ...(user.id ? [{
            label: `Welcome user ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: "Logout",
                    key: "logout"
                }

            ]

        }] : [])
    ];

    const onClick = e => {
        setCurrent(e.key);
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    );
}

export default Header;