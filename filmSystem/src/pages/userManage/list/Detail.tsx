import {Form, Input, Modal, Radio} from 'antd';
import React, {useEffect, useState} from 'react';
import {IUser, userDetail} from "../../../api/user";

const Detail:React.FC<{id:string,visible:boolean,close:()=>void}> = ({id,visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [detail, setDetail] = useState<IUser>()
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const {data} = await userDetail({id})
            setDetail(data)
            form.setFieldsValue(data)
        })()
    }, [id]);
    const [componentDisabled] = useState<boolean>(true);
    return (
        <Modal
            onCancel={onCancel}
            open={visible}
            wrapClassName="modal-wrap"
            cancelButtonProps={{shape: 'round'}}
            okButtonProps={{shape: 'round'}}
            width={600}
            footer={null}
            title="用户信息"
        >
            <Form
                form={form}
                name="basic"
                disabled={componentDisabled}
                initialValues={detail}
            >
                <Form.Item
                    label="用户登录名"
                    name="username"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="用户全名"
                    name="nickName"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="电子邮件"
                    name="email"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="用户角色"
                    name="role"
                >
                    <Radio.Group name="radiogroup" defaultValue={0}>
                        <Radio value={1}>管理员</Radio>
                        <Radio value={0}>普通用户</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="移动电话"
                    name="phone"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="锁定"
                    name="status"
                >
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>未锁定</Radio>
                        <Radio value={0}>锁定</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default Detail;

