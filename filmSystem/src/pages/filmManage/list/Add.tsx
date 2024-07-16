import {Button, Form, Input, message, Modal, Select, Upload, UploadFile, UploadProps} from 'antd';
import React, {useEffect, useState} from 'react';
import ImgCrop from 'antd-img-crop';
import {UploadOutlined} from "@ant-design/icons";
import {resourcesAdd} from "../../../api/film";
import {resourcesTypeList} from "../../../api/filmType";
const Add:React.FC<{visible:boolean,close:()=>void}> = ({visible,close}) => {
    const onCancel = () => {
        close();
    };
    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);
    const [types, setTypes] = useState<{}[]>()

    useEffect(() => {
        (async () => {
            const {data} = await resourcesTypeList({})
            setTypes(data.list.map((item) => {
                return {
                    label: item.name,
                    value: item.name
                }
            }))
        })()
    }, []);
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
    const add = (info:{title:string;introduce:string;type:string}) => {
        const form = new FormData()
        form.append('fileCover', fileList[0].originFileObj as Blob)
        form.append('fileResources', fileList1[0].originFileObj as Blob)
        form.append('title', info.title)
        form.append('introduce', info.introduce)
        form.append('type', info.type)
        resourcesAdd(form).then((res) => {
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
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        fileList:fileList1,
        maxCount: 1,
        accept: "video/*",
        onChange(info) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList1(fileList);
        },
        beforeUpload: () => {
            return false
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
            title="电影信息"
        >
            <Form
                form={form}
                onFinish={add}
                name="basic"
            >
                <Form.Item
                    label="标题"
                    name="title"
                    required={true}

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="简介"
                    name="introduce"
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
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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

                <Form.Item
                    label="资源类型"
                    name="type"
                    required={true}
                >
                    <Select
                        placeholder="请选择"
                        style={{ width: 120 }}
                        options={types}
                    />
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

