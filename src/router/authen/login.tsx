import React,{ useState,useRef,useEffect} from "react";
import { Form, Button, Input, message } from "antd"
import '../../styles/login.scss'
import {payloadSubmitLogin} from "../../interfaces/payloadSubmitLogin"
import API from "./API"
const LoginPage: React.FC = () => {
  const inputEmail = useRef<any>(null)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const onFinish = async (values: any) => {
    const params: payloadSubmitLogin ={
      email: email,
      password: password,
    }
    const response = await API.login(params)
    if(response.status ===200){
      const {data} = response.data
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("You don't enter enough fields")
  };
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail( e.currentTarget.value);
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword( e.currentTarget.value);
  }

  useEffect(() => {
    inputEmail.current.focus()
  },[])

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
          </div>
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
              rules={[{ required: true, message: 'Please input your email!',type: "email", }]}
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
          </Form>
        </div>
      </div>
    </>
  )
}
export default LoginPage