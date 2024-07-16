import {
    Button,
    Form,
    Input, message
} from 'antd';
import "./index.scss"
import {useNavigate} from "react-router-dom";
import {register} from "../../api/user";
import {useState} from "react";




const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const App = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = async (values: object) => {
        setLoading(true)
        register({
            ...values,
            roleId:"33ac92dd7a1f11ee97a600e04c8399f4"
        }).then(res=>{
            if(res.code === 200) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(()=>{
            setLoading(false)
        })
    };
    const navigate = useNavigate()
    return (
        <div className="register">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{maxWidth: 600}}
                labelCol={{span: 6, offset: 0}}
                scrollToFirstError
            >
                <h2>数字人电影园区后台注册</h2>

                <Form.Item
                    name="username"
                    label="账号"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的账号!'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的密码!'
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="rePassword"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认你的密码!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('您输入的新密码不匹配!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="nickName"
                    label="昵称"
                    tooltip="你想其他人叫你什么?"
                    rules={[{required: true, message: '请输入你的昵称!', whitespace: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button loading={loading} type="primary" htmlType="submit">
                        注册
                    </Button>
                    <Button type="link" onClick={() => {
                        navigate("/login")
                    }}>
                        已有账号去登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default App;
