import {useEffect, useState} from 'react';
import {Button, message, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import Detail from "./Detail.tsx";
import Add from "./Add.tsx";
import Update from "./Update.tsx";
import {IPartType, parkTypesDelete, parkTypesList} from "../../../api/parkType";


const ParkTypeList = () => {
    const columns: ColumnsType<IPartType> = [
        {
            title: "类型名称",
            dataIndex: 'typeName',
            key: 'typeName'
        },
        {
            title: '封面',
            dataIndex: 'typeCover',
            key: 'typeCover',
            render: (_, record) => (
                <img src={record.typeCover} alt="" style={{width: "100px"}}/>
            )

        },
        {
            title: '类型描述',
            dataIndex: 'typeDescription',
            key: 'typeDescription'
        },
        {
            title: '创建时间',
            key: 'createdAt',
            dataIndex: 'createdAt'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        detail(record.id)
                    }}>
                        查看
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        deleteFilm(record.id)
                    }}>
                        删除
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        setId(record.id)
                        setUpdateShow(true)
                    }}>
                        修改
                    </Button>
                </Space>
            ),
        },
    ];

    const [data, setData] = useState<IPartType[]>()
    const [id, setId] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [addShow, setAddShow] = useState<boolean>(false)
    const [updateShow, setUpdateShow] = useState<boolean>(false)

    const [a, setA] = useState<number>(0)
    const detail = (id: string) => {
        setId(id)
        setShow(true)
    }
    const deleteFilm = (id: string) => {
        parkTypesDelete({
            id
        }).then(res=>{
            if(res.code===200) {
                message.success("删除成功").then()
                setA(a+1)
            } else {
                message.error("出错了").then()
            }
        })
    }

    useEffect(() => {
        (async () => {
            const {data: {list}} = await parkTypesList({})
            setData(list)
        })()
    }, [a]);
    return <>
        <Button type="primary" style={{marginTop:"20px"}} onClick={()=>{
            setAddShow(true)
        }}>
            添加园区类型
        </Button>
        <Table style={{marginTop:"10px"}} columns={columns} dataSource={data} rowKey="id"/>
        <Detail id={id} visible={show} close={()=>{
            setShow(false)
        }}/>
        <Add visible={addShow} close={()=>{
            setAddShow(false)
            setA(a+1)
        }}/>
        <Update id={id} visible={updateShow} close={()=>{
            setUpdateShow(false)
            setA(a+1)
        }}/>
    </>;
}

export default ParkTypeList;
