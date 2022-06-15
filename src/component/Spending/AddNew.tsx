import React, { useState, useEffect, memo } from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { DatePickerProps } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
interface Props {
  isModalVisible: boolean;
  cancelModal: any
};
const AddNewSpending: React.FC<Props> = ({ isModalVisible,cancelModal }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const hanldeMoney = (value: number | string) => {
    console.log('changed', value);
  };
  const handleCate = (value: string) => {
    console.log(`selected ${value}`);
  };
  const hanldeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const dummyRequest = (e: any) => {
    setTimeout(() => {
     e.onSuccess("ok");
    }, 0);
  };
  return (
    <>
      <Modal title="Add new spending" visible={isModalVisible} style={{ top: 20 }} onCancel={cancelModal}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Spending money"
            name="money"
            rules={[{ required: true, message: 'Please input your spending money!' }]}
          >
            <InputNumber
              defaultValue={"1000"}
              style={{ width: "100%" }}
              formatter={(value: string | undefined) => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: string | undefined) => value!.replace(/\VNĐ\s?|(,*)/g, '')}
              onChange={hanldeMoney}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="cate"
            rules={[{ required: true, message: 'Please choose a category!' }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={handleCate}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Note"
            name="note"
            rules={[{ required: true, message: 'Please input note!' }]}
          >
            <TextArea rows={2} placeholder="Note" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please choose date!' }]}
          >
            <DatePicker onChange={hanldeDate} format={"dddd, YYYY/MM/DD"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
          >
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                customRequest={dummyRequest}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default memo(AddNewSpending)