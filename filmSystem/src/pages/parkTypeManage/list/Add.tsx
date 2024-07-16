import {Button, Form, Input, message, Modal, Upload, UploadFile, UploadProps} from 'antd';
import React, { useState} from 'react';
import ImgCrop from 'antd-img-crop';
import {UploadOutlined} from "@ant-design/icons";
import {parkTypesAdd} from "../../../api/parkType";
const Add:React.FC<{visible:boolean,close:()=>void}> = ({visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);
    const [cover, setCover] = useState(null)
    const [rRes, setRes] = useState(null)
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if(newFileList.length>0&&newFileList[0].response) {
            setCover(newFileList[0].response.data.url)
        }
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const add = (info:{typeName:string;typeDescription:string}) => {
        parkTypesAdd({
            typeName:info.typeName,
            typeDescription: info.typeDescription,
            typeCover:cover,
            typeResources:rRes
        }).then((res) => {
            if(res.code === 200) {
                message.success(res.message).then(() => true)
                close()
            } else {
                message.error(res.message).then(() => true)
            }
        })
    }
    const [fileList1, setFileList1] = useState<UploadFile[]>([

    ]);
    const props: UploadProps = {
        name: 'file',
        action: 'http://127.0.0.1:8110/filmSystem/file/upload',
        headers: {
            authorization: 'authorization-text',
        },
        fileList:fileList1,
        maxCount: 1,
        accept: "video/*",
        onChange(info) {
            if(info.fileList.length>0&&info.fileList[0].response) {
                setRes(info.fileList[0].response.data.url)
            }
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList1(fileList);
        }
    };
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
            title="园区类型信息"
        >
            <Form
                form={form}
                onFinish={add}
                name="basic"
            >
                <Form.Item
                    label="类型名称"
                    name="typeName"
                    required={true}

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="简介"
                    name="typeDescription"
                    required={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="封面"
                    name="cover"
                    required={true}
                >
                    <ImgCrop rotationSlider>
                        <Upload
                            action="http://127.0.0.1:8110/filmSystem/file/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Form.Item>
                <Form.Item
                    label="视频"
                    name="video"
                    required={true}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
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

