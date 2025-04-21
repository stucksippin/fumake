'use client'
import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import TableFurniture from './TableFurniture';
import CreateForm from './CreateModal';


const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Список всех товаров', '1', <PieChartOutlined />),
    getItem('Добавление товаров', '2', <DesktopOutlined />),
];


export default function AdminPanel({ furnitures }) {
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState('1')

    const renderContent = () => {
        switch (activeKey) {
            case '1':
                return <TableFurniture furnitures={furnitures} />
            case '2':
                return <CreateForm />
            default:
                return <div>не может быть</div>
        }
    }
    return (
        <Layout style={{ minHeight: '100vh', }} >
            <Sider width={220} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" mode="inline" items={items} onClick={(e) => setActiveKey(e.key)} />
            </Sider>

            <Layout>
                <Content style={{ margin: '10px 16px', }}>
                    {renderContent()}
                </Content>
            </Layout>

        </Layout>
    );
};
