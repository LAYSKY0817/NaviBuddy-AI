import {Button, Form, Input, message, Modal} from 'antd';
import React from 'react';
import {resourcesTypeAdd} from "../../../api/filmType";
const Add:React.FC<{visible:boolean,close:()=>void}> = ({visible,close}) => {
    const onCancel = () => {
        close();
    };

    const add = (info:any) => {
        resourcesTypeAdd(info).then((res) => {
            if(res.code === 200) {
                message.success(res.message).then(() => true)
                close()
            } else {
                message.error(res.message).then(() => true)
            }
        })
    }

    const [form] = Form.useForm();
    return (
        <Modal
            onCancel={onCancel}
            open={visible}
            wrapClassName="modal-wrap"
            cancelButtonProps={{shape: 'round'}}
            okButtonProps={{shape: 'round'}}
            width={600}
            footer={null}
            title="电影信息"
        >
            <Form
                form={form}
                onFinish={add}
                name="basic"
            >
                <Form.Item
                    label="类型名称"
                    name="name"
                    required={true}

                >
                    <Input/>
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


export default Add;

