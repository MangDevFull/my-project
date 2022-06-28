import React, { useState, memo } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { AddNewCategoryIf } from "../../interfaces/payloadCategory"
const { TextArea } = Input;
interface Props {
  isModalVisible: boolean;
  cancelModal: any
};
const AddNewCategory: React.FC<Props> = ({ isModalVisible, cancelModal }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [name, setName] = useState<string>("")
  const [note, setNote] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  };
  const handleNote = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNote(e.currentTarget.value)
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const dummyRequest = (e: any) => {
    setTimeout(() => {
      e.onSuccess("ok");
    }, 0);
  };
  const hanldeSubmit = async () => {
    if (name === "") {
      message.error("Please enter a name");
    } else {
      let payload: AddNewCategoryIf = {
        name: name,
      }
      if (image !== "") {
        payload = {
          ...payload,
          image: image,
        }
      }
      if(note !==""){
        payload ={
          ...payload,
          note: note
        }
      }
      console.log(payload)
    }
  }
  return (
    <>
      <Modal title="Add new category" visible={isModalVisible} style={{ top: 20 }} onCancel={cancelModal} onOk={hanldeSubmit}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="money"
            rules={[{ required: true, message: 'Please input your category name!' }]}
          >
            <Input
              placeholder="Enter name"
              onChange={handleName}
            />
          </Form.Item>
          <Form.Item
            label="Note"
            name="note"
          >
            <TextArea rows={2} placeholder="Note" onChange={handleNote} />
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
export default memo(AddNewCategory)