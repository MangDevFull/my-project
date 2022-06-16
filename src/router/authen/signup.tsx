import React, { useState, useRef, useEffect } from "react";
import type { DatePickerProps } from 'antd';
import { Form, Button, Input, message, Select, DatePicker } from "antd"
import { payloadSignup } from "../../interfaces/payloadSignup";
import { useNavigate,Link } from 'react-router-dom';
import API from "./API"
const { Option } = Select;
const SignupPage: React.FC = () => {
  let navigate = useNavigate();
  const inputEmail = useRef<any>(null)
  const [isDisabled,setIsDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  useEffect(() => {
    inputEmail.current.focus()
  }, [])
  const onFinish = async (values: any) => {
    setIsDisabled(true)
    const payload: payloadSignup = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
      dateOfBirth: date,
      gender: gender,
    }
    const response = await API.signup(payload)
    if (response.status === 200) {
      const { data } = response
      if (data.status == 200) {
        message.success("Successful signup")
        navigate('../login')
      } else {
        setIsDisabled(false)
        message.error(data.message)
      }
    }else{
      setIsDisabled(false)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("You don't enter enough fields")
  };
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }
  const hanldeFullName = (e: React.FormEvent<HTMLInputElement>) => {
    setFullName(e.currentTarget.value);
  }
  const handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value);
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }
  const hanldeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };
  const handleGender = (value: string) => {
    setGender(value);
  };
  return (
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <p className="form-title">Hello</p>
      <p>Signup to enjoy moment</p>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input
          placeholder="Please input your full name"
          onChange={hanldeFullName}
          ref={inputEmail}
        />
      </Form.Item>
      <Form.Item name="date"
        rules={[{ required: true, message: 'Please input your date of birth!' }]}
      >
        <DatePicker onChange={hanldeDate} style={{ width: '100%' }} placeholder="Please input your date of birth" />
      </Form.Item>
      <Form.Item name="gender" rules={[{ required: true }]}>
        <Select
          style={{ height: "100%" }}
          placeholder="Select a gender"
          onChange={handleGender}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your email!', type: "email", }]}
      >
        <Input
          placeholder="Please input your email"
          onChange={handleEmail}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input
          placeholder="Please input your phone"
          onChange={handlePhone}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="Password"
          onChange={handlePassword}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={isDisabled}>
          SIGNUP
        </Button>
      </Form.Item>
      <Form.Item>
      <Link to="../login"><p className="text-center">Already a member ?</p></Link>
      </Form.Item>
    </Form>
  )
}

export default SignupPage