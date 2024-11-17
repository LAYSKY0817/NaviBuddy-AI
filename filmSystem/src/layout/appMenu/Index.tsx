import {Menu, MenuProps} from "antd";
import React from "react";
import {
    UserOutlined, VideoCameraAddOutlined, VideoCameraOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('用户管理', '/userManage',<UserOutlined />),
    getItem('园区类型管理', '/parkTypeManage',<VideoCameraAddOutlined />),
    getItem('电影类型管理', '/filmTypeManage',<VideoCameraAddOutlined />),
    getItem('电影资源管理', '/filmManage',<VideoCameraOutlined />)
    
];

const AppMenu:React.FC = ()=>{
    const navigate = useNavigate()
    const onSelect = (e:{key:string})=>{
        navigate(e.key)
    }
    const location = useLocation()
    let defaultOpenKeys:string = "userManage"
    return  <Menu onSelect={
        (e:{key:string})=>{
            onSelect(e)
        }
    } theme="dark" defaultOpenKeys={[defaultOpenKeys]} defaultSelectedKeys={[location.pathname]} mode="inline" items={items}></Menu>
}
export default AppMenu
