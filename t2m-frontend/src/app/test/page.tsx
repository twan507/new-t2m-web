'use client'
import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import './page.css'; // Import CSS file for custom styles

const columns: any = [
  {
    title: 'Cột 1',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <span style={{
        color: 'blue',
        fontFamily: 'Calibri, sans-serif',
        display: 'flex',
        justifyContent: 'flex-start',
      }}>{text}</span>
    ),
  },
  {
    title: 'Cột 2',
    dataIndex: 'value',
    key: 'value',
    sorter: (a: any, b: any) => {
      return a.value - b.value;
    },
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Cột 3',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const data = [
  {
    key: '1', // Thêm trường key duy nhất
    name: 'John Brown',
    value: 32,
    tags: ['nice'],
  },
  {
    key: '2', // Thêm trường key duy nhất
    name: 'Jim Green',
    value: 42,
    tags: ['loser'],
  },
  {
    key: '3', // Thêm trường key duy nhất
    name: 'Joe Black',
    value: 32,
    tags: ['cool'],
  },
];

const TaTable: React.FC = () => {



  return (
    <div>
      <div style={{ width: '800px', margin: '200px' }}>
        <Table className="custom-table" columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default TaTable;
