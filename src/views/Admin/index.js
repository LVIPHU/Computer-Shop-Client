import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    EyeOutlined,
    HomeOutlined,
    IdcardOutlined,
    NotificationOutlined,
    PlusCircleOutlined,
    ReconciliationOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import SubMenu from 'antd/lib/menu/SubMenu';
import defaultAvt from '@/assets/imgs/default-avt.png';
import logoUrl from '@/assets/imgs/sec_logo.png';
import React, { useState } from 'react';
import constants from '@/utils/constants';
import './index.scss';
import pages from '@/views';
import * as Redux from 'react-redux';
import actionsAuth from '@/redux/actions/auth';
import actionsProduct from '@/redux/actions/product';
import actionsCategory from '@/redux/actions/category';
const { Sider } = Layout;

const mainColor = '#F78B2D';
const menuList = [
    {
        key: 'd',
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        children: [],
    },
    {
        key: 'p',
        title: 'Products',
        icon: <ShoppingCartOutlined />,
        children: [
            { key: 'p0', title: 'See', icon: <EyeOutlined /> },
            { key: 'p1', title: 'Add', icon: <PlusCircleOutlined /> },
        ],
    },
    {
        key: 'c',
        title: 'Customers',
        icon: <UserOutlined />,
        children: [],
    },
    {
        key: 'a',
        title: 'Amin Users',
        icon: <IdcardOutlined />,
        children: [],
    },
    {
        key: 'o',
        title: 'Order List',
        icon: <ReconciliationOutlined />,
        children: [],
    },
    {
        key: 'm',
        title: 'Marketing',
        icon: <NotificationOutlined />,
        children: [],
    },
];

function AdminPage() {
    const dispatch = Redux.useDispatch();
    const authLogin = Redux.useSelector((state) => state.authLogin);
    const { userInfo } = authLogin;
    const [keyMenu, setKeyMenu] = useState('d');
    const [collapsed, setCollapsed] = useState(false);
    // fn: Xử lý khi chọn item
    const handleSelected = (e) => {
        const { key } = e;
        setKeyMenu(key);
    };

    // fn: Show Title Selected
    const showTitleSelected = (key) => {
        let result = 'Dashboard';
        menuList.forEach((item) => {
            if (item.key === key) result = item.title;
            item.children.forEach((child) => {
                if (child.key === key) result = `${item.title} > ${child.title}`;
            });
        });
        return result;
    };

    // fn: render menu
    const renderMenuItem = () => {
        // return MenuItem if children = null
        return menuList.map((item, index) => {
            const { key, title, icon, children } = item;
            if (children.length === 0)
                return (
                    <Menu.Item className="menu-item" key={key} icon={icon}>
                        <span className="menu-item-title">{title}</span>
                    </Menu.Item>
                );
            // else render SubMenu
            return (
                <SubMenu className="menu-item" key={key} icon={icon} title={title}>
                    {children.map((child, index) => (
                        <Menu.Item className="menu-item" key={child.key} icon={child.icon}>
                            <span className="menu-item-title">{child.title}</span>
                        </Menu.Item>
                    ))}
                </SubMenu>
            );
        });
    };

    // fn: render component tương ứng
    const renderMenuComponent = (key) => {
        switch (key) {
            case 'd':
                return <pages.Dashboard />;
            case 'p0':
                dispatch(actionsProduct.getAllProducts());
                dispatch(actionsCategory.getAllCategory());
                return <pages.Products />;
            case 'p1':
                return <pages.AddProduct />;
            case 'a':
                return <pages.Users />;
            case 'c':
                return <pages.Customers />;
            case 'o':
                return <pages.Orders />;
            default:
                break;
        }
    };

    // event: logout
    const onLogout = () => {
        dispatch(actionsAuth.logout());
    };

    return (
        <div className="Admin-Page" style={{ backgroundColor: '#e5e5e5' }}>
            {/* header */}
            <div className="d-flex align-i-center" style={{ height: '72px', backgroundColor: mainColor }}>
                <div className="logo t-center" style={{ flexBasis: '200px' }}>
                    <img width={100} height={48} src={logoUrl} alt={'logo'} />
                </div>
                <div className="flex-grow-1 d-flex align-i-end">
                    {/* <h2 className="t-color-primary flex-grow-1 p-l-44 main-title">
                        <span>Admin Page &gt; </span>
                        <span className="option-title">{showTitleSelected(keyMenu)}</span>
                    </h2> */}
                    <div className="flex-grow-1 p-l-44"></div>
                    <a href="/" className="open-web p-r-24 t-color-primary font-weight-500 p-b-10">
                        <HomeOutlined
                            className="icon font-size-28px t-color-primary m-r-10"
                            style={{ transform: 'translateY(3px)' }}
                        />
                        <span className="open-web-title">Open the website</span>
                    </a>
                    <div className="user-admin p-r-24 t-color-primary font-weight-500">
                        <Avatar size={36} className="m-r-10" src={defaultAvt} />
                        <span className="user-admin-title">{userInfo.email}</span>
                    </div>
                    <Button onClick={onLogout} className="m-r-44" type="dashed">
                        Đăng xuất
                    </Button>
                </div>
            </div>
            {/* main content */}
            <div className="d-flex">
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    {/* menu dashboard */}
                    <Menu
                        className="menu p-t-24"
                        onClick={handleSelected}
                        style={{
                            height: 'inherit',
                            minHeight: '100vh',
                            backgroundColor: mainColor,
                            flexBasis: '200px',
                        }}
                        defaultSelectedKeys={keyMenu}
                        mode="inline"
                    >
                        {renderMenuItem()}
                    </Menu>
                </Sider>
                {/* main contents */}
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    {renderMenuComponent(keyMenu)}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
