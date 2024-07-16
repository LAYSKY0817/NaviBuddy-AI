import {useEffect, useState} from 'react';
import {Button, message, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {IUser, userList, userUpdate} from "../../../api/user";
import Detail from "./Detail.tsx";
import Add from "./Add.tsx";
import Update from "./Update.tsx";


const UserList = () => {


    const columns: ColumnsType<IUser> = [
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'phone',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: '是否锁定',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, {state}) => (
                <>
                    {state === 1 ? <Tag color="#f50">否</Tag> : <Tag color="#2db7f5">是</Tag>}
                </>
            )
        },
        {
            title: '创建时间',
            key: 'createdTime',
            dataIndex: 'createdTime'
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
                    {record.state===1?<Button onClick={() => {
                        update(record.id,0)
                    }}>
                        禁用
                    </Button>:<Button type="primary" onClick={() => {
                        update(record.id,1)
                    }}>
                        启用
                    </Button>}
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

    const [data, setData] = useState<IUser[]>()
    const [id, setId] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [addShow, setAddShow] = useState<boolean>(false)
    const [updateShow, setUpdateShow] = useState<boolean>(false)

    const [a, setA] = useState<number>(0)
    const detail = (id: string) => {
        setId(id)
        setShow(true)
    }
    const update = (id: string,state:number) => {
        userUpdate({
            id,
            state
        }).then(res=>{
            if(res.code===200) {
                message.success("操作成功").then()
                setA(a+1)
            } else {
                message.error("出错了").then()
            }
        })
    }


    useEffect(() => {
        (async () => {
            const {data: {list}} = await userList({})
            setData(list)
        })()
    }, [a]);
    return <>
        <Button type="primary" style={{marginTop:"20px"}} onClick={()=>{
            setAddShow(true)
        }}>
            添加用户
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

export default UserList;
