import { Link, NavLink } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from "react";

const Header = () => {
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

        }
    ];

    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    );
}

export default Header;