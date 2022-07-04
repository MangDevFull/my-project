import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Input, message } from "antd"
import { payloadSubmitLogin } from "../../interfaces/payloadSubmitLogin"
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Add_Infor_Account_Action } from "../../redux/actions/account.action"
import API from "./API"
const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const inputEmail = useRef<any>(null)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const onFinish = async (values: any) => {
    localStorage.removeItem("myProjectToken")
    localStorage.removeItem("myProjectuserId")
    const params: payloadSubmitLogin = {
      email: email,
      password: password,
    }
    const response = await API.login(params)
    if (response.status === 200) {
      const { data } = response
      if (data.status === 200) {
        const { token, userId,refreshToken } = data.data
        localStorage.setItem("myProjectToken", JSON.stringify(token))
        localStorage.setItem("myProjectuserId", JSON.stringify(userId))
        localStorage.setItem("myProjectrefreshToken", JSON.stringify(refreshToken))
        dispatch(Add_Infor_Account_Action({
          accountInfor: data.data.account,
          userId: userId,
        }))
        navigate(`/home`, { replace: true });
      } else {
        message.error(data.message)
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("You don't enter enough fields")
  };
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  useEffect(() => {
    inputEmail.current.focus()
  }, [])

  return (
    <>
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <p className="form-title">Welcome back</p>
        <p>Login to the Dashboard</p>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your email!', type: "email", }]}
        >
          <Input
            placeholder="Please input your email"
            onChange={handleEmail}
            ref={inputEmail}
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            LOGIN
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="../signup"><p className="text-center">Need an account ?</p></Link>
        </Form.Item>
      </Form>
    </>
  )
}
export default LoginPage