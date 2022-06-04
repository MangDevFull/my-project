import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Tabs, Pagination } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { DataTypeSpending } from "../../interfaces/tableSpending"
import AddNew from "../../component/Spending/AddNew"
import {
  PlusOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;
import { spendingTabs } from '../../enums/spendingTabs.enum';
import { TransSpendingEnum } from '../../enums/ spendingTran.enum';
const SpendingIndex: React.FC = () => {
  const [date, setDate] = useState("1")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(0)
  const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
  const columns: ColumnsType<DataTypeSpending> = [
    {
      title: 'Date',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Money Total',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Content',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataTypeSpending[] = [
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
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
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
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
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
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const onChangePage = (pageChange: number, pageSizeChange: number) => {
    setPage(pageChange)
    setLimit(pageSizeChange);
  };
  const showModal = ()=>{
    setIsModalVisible(true)
  }

  return (
    <>
      <div className="mb-2 ">
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>Add new spending </Button>
      </div>
      <Tabs defaultActiveKey={date}>
        <TabPane tab={TransSpendingEnum(spendingTabs.currentMonth)} key={`1`}>
        </TabPane>
        <TabPane tab={TransSpendingEnum(spendingTabs.beforeMonth)} key={`2`}>
        </TabPane>
        <TabPane tab={TransSpendingEnum(spendingTabs.beforeSecondMonth)} key={`3`}>
        </TabPane>
      </Tabs>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record: any) => record._id} />
      <div className="d-flex-end mt-2">
        <Pagination current={page} total={total}
          onChange={(page, pageSize) => onChangePage(page, pageSize)} />
      </div>
      <AddNew isModalVisible={isModalVisible} />
    </>

  )
}
export default SpendingIndex