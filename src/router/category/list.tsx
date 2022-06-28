import React, { useState, useLayoutEffect } from "react";
import API from "./API.category"
import { Table, Space, Pagination, Skeleton, Image,Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { TableCategoryForCustomer } from "../../interfaces/tableCategoryCus"
import { format } from "date-fns"
import { EditOutlined,PlusOutlined } from "@ant-design/icons"
import AddNew from "../../component/Category/AddNew"
import IncomePrice from "../../component/Price/Income";
const CategoryPage: React.FC = () => {
  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<TableCategoryForCustomer[]>([])
  const [total, setTotal] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  useLayoutEffect(() => {
    getCategoryList(limit, page)
  }, [limit, page])
  const getCategoryList = async (limit: number = 20, page: number = 1) => {
    const response = await API.getCategoryListforCustomer()
    const { data } = response
    if (data.status === 200) {
      console.log(data)
      setList(data.data.docs)
      setLimit(data.data.limit)
      setPage(data.data.page)
      setTotal(data.data.total)
    }
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const cancelModal = () => {
    setIsModalVisible(false)
  }
  const columns: ColumnsType<TableCategoryForCustomer> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => {
        return (
          <>
            <Image
              width={100}
              src={image}
            />
          </>
        )
      },
    },
    {
      title: 'At Date',
      key: 'date',
      render: (date) => {
        return (
          <>
            <p>Created Date: {format(new Date(date.createdAt), 'MM/dd/yyyy HH:mm:ss')}</p>
            <p>Updated Date: {format(new Date(date.updatedAt), 'MM/dd/yyyy HH:mm:ss')}</p>
          </>
        )
      },
    },
    {
      title: 'Total Income',
      dataIndex: 'totalIncome',
      key: 'address',
      render:(data) => {
        return(
          <IncomePrice number={10} type="income-price" />
        )
      }
    },
    {
      title: 'Total spending',
      dataIndex: 'address',
      key: 'address',
      render:(data) => {
        return(
          <IncomePrice number={10} type="spending-price" />
        )
      }
    },
    {
      title: 'Turnover',
      dataIndex: 'turnover',
      key: 'turnover',
      render:(data) => {
        return(
          <IncomePrice number={10} type="turnover-price" />
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <EditOutlined className="handle" />
        </Space>
      ),
    },
  ];
  const onChangePage = (pageChange: number, pageSizeChange: number) => {
    setPage(pageChange)
    setLimit(pageSizeChange);
  };
  return (
    <>
      {list.length > 0 ?
        <>
          <div className="mb-2 ">
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>Add new category</Button>
          </div>
          <Table
            columns={columns}
            dataSource={list}
            pagination={false}
            rowKey={(record: any) => record._id} />
          <div className="d-flex-end mt-2">
            <Pagination current={page} total={total}
              onChange={(page, pageSize) => onChangePage(page, pageSize)} />
          </div>
          <AddNew isModalVisible={isModalVisible} cancelModal={cancelModal} />
        </>
        :
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      }

    </>
  )
}

export default CategoryPage