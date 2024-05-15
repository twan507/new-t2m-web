'use client'
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './page.css'; // Import CSS file for custom styles

const columns: TableProps<any>['columns'] = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: '',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: any = [
  {
    name: 'John Brown',
    value: 32,
    tags: ['nice'],
    key: '1'
  },
  {
    name: 'Jim Green',
    value: 42,
    tags: ['loser'],
    key: '2'
  },
  {
    name: 'Joe Black',
    value: 32,
    tags: ['cool'],
    key: '3'
  },
];

const TaTable: React.FC = () => {
  const [checkAuth, setCheckAuth] = useState(true);
  useEffect(() => {
    setCheckAuth(false)
  }, []);
  if (!checkAuth) {
    return (
      <>
        <style>
          {`
        .taindex-table .ant-table-thead>tr>th,
        .taindex-table .ant-table-tbody>tr>td {
            padding: 5px;
        }
        `}
        </style>
        <div style={{ width: '300px' }}>
          <Table className="taindex-table" columns={columns} dataSource={data} pagination={false} showHeader={false} />;
        </div>
      </>

    )
  }
}
export default TaTable;
