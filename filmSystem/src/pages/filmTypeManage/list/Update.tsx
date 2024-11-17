import {Button, Form, Input, message, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {IFilmType, resourcesTypeDetail, resourcesTypeUpdate} from "../../../api/filmType";

const Update:React.FC<{id:string,visible:boolean,close:()=>void}> = ({id,visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [detail, setDetail] = useState<IFilmType>()
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const {data} = await resourcesTypeDetail({id})
            setDetail(data)
            console.log(data)
            form.setFieldsValue(data)
        })()
    }, [id,visible]);
    const add = (info: {status:number}) => {
        resourcesTypeUpdate({
            id: id,
            ...info
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
            title="修改电影类型信息"
        >
            <Form
                form={form}
                onFinish={add}
                name="basic"
                initialValues={detail}
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


export default Update;

