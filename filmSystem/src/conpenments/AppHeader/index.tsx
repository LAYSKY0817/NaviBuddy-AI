import {Button, Modal} from "antd";
import "./index.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
export default function () {
    const navigate =  useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.clear()
        navigate("/login")
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <div className="header">
        <Button type="text" onClick={()=>showModal()}>退出登录</Button>
        <Modal title="确认要退出账户吗？" okText="确认" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        </Modal>
    </div>
}
