import {Button, Form, Input, message, Modal, Radio} from 'antd';
import React, {useEffect, useState} from 'react';
import {IUser, userDetail, userUpdate} from "../../../api/user";

const Update:React.FC<{id:string,visible:boolean,close:()=>void}> = ({id,visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [detail, setDetail] = useState<IUser>()
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const {data} = await userDetail({id})
            setDetail(data)
            console.log(data)
            form.setFieldsValue(data)
        })()
    }, [id,visible]);
    const add = (info: {status:number}) => {
        userUpdate({
            id: id,
            ...info,
            status: info.status===undefined?1:info.status!=undefined ? info.status : info.status
        }).then((res) => {
            if(res.code === 200) {
                message.success(res.message).then(() => true)
                close()
            } else {
                message.error(res.message).then(() => true)
            }
        })
    }
    return (
        <Modal
            onCancel={onCancel}
            open={visible}
            wrapClassName="modal-wrap"
            cancelButtonProps={{shape: 'round'}}
            okButtonProps={{shape: 'round'}}
            width={600}
            footer={null}
            title="修改用户信息"
        >
            <Form
                form={form}
                onFinish={add}
                name="basic"
                initialValues={detail}
            >
                <Form.Item
                    label="用户登录名"
                    name="username"
                    required={true}

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="用户全名"
                    name="nickName"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    required={true}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="电子邮件"
                    name="email"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="用户角色"
                    name="role"
                >
                    <Radio.Group name="radiogroup" defaultValue={0} value={0}>
                        <Radio value={1}>管理员</Radio>
                        <Radio value={0}>普通用户</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="移动电话"
                    name="phone"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="锁定"
                    name="status"
                >
                    <Radio.Group name="radiogroup" defaultValue={1} value={1}>
                        <Radio value={1}>未锁定</Radio>
                        <Radio value={0}>锁定</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};


export default Update;

