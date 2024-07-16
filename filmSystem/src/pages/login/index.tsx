    import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input, message} from 'antd';
import "./index.scss"
import {useNavigate} from "react-router-dom";
import {login} from "../../api/user";
const Login: React.FC = () => {
    const navigate = useNavigate()
    const onFinish = (values: object) => {
        console.log('Received values of form: ', values);
        login({
            ...values,
            code:200
        }).then((res) => {
            console.log(res)
            if(res.code === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                message.success(res.message).then(() => true)
                navigate("/")
            } else {
                message.error(res.message).then(() => true)
            }
        })
    };
    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h2>数字人电影园区后台登录</h2>

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入你的账号!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}

                        placeholder="密码"
                    />
                </Form.Item>


                <Form.Item>
                    <div >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <Button className="login-form-button" onClick={()=>{
                            navigate("/register")
                        }}>
                            注册
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
