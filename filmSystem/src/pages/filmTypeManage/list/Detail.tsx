import { Form, Input, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {IFilmType, resourcesTypeDetail} from "../../../api/filmType";

const Detail:React.FC<{id:string,visible:boolean,close:()=>void}> = ({id,visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [detail, setDetail] = useState<IFilmType>()
    const [form] = Form.useForm();
    const [componentDisabled] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            const {data} = await resourcesTypeDetail({id})
            setDetail(data)
            form.setFieldsValue(data)
        })()
    }, [id]);
    return (
        <Modal
            onCancel={onCancel}
            open={visible}
            wrapClassName="modal-wrap"
            cancelButtonProps={{shape: 'round'}}
            okButtonProps={{shape: 'round'}}
            width={600}
            footer={null}
            title="类型信息"
        >
            <Form
                form={form}
                disabled={componentDisabled}
                initialValues={detail}
            >
                <Form.Item
                    label="类型名称"
                    name="name"
                    required={true}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default Detail;

