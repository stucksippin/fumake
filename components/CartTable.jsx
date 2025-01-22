import { Table } from 'antd';
import React from 'react'

export default function CartTable() {
    const columns = [
        {
            title: 'Продукт',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Кол-во',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: 'Итог',
            key: 'subtotal',
            dataIndex: 'subtotal',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div className='cart_table'>
            <Table columns={columns} data={data} />
        </div>
    )
}
