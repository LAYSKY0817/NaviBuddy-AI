import {Form, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {IPartType, parkTypesDetail} from "../../../api/parkType";

const Detail:React.FC<{id:string,visible:boolean,close:()=>void}> = ({id,visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [detail, setDetail] = useState<IPartType>()
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const {data} = await parkTypesDetail({id})
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
            title="视频信息"
        >
            <video src={detail?.typeResources} controls={true} width="100%" height="100%"/>

        </Modal>
    );
};


export default Detail;

