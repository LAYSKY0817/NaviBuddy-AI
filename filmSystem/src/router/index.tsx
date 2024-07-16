import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/login";
import Layout from "../layout";
import Register from "../pages/register";
import UserList from "../pages/userManage/list/Index.tsx";
import FilmList from "../pages/filmManage/list/Index.tsx";
import FilmTypeList from "../pages/filmTypeManage/list/Index.tsx";
import ParkTypeList from "../pages/parkTypeManage/list/Index.tsx";



const RouterIndex = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<Navigate to="/userManage"/>}></Route>
            <Route path="/"  element={<Layout/>}>
                <Route path="userManage" element={<UserList/>}></Route>
                <Route path="filmManage" element={<FilmList/>}></Route>
                <Route path="filmTypeManage" element={<FilmTypeList/>}></Route>
                <Route path="parkTypeManage" element={<ParkTypeList/>}></Route>
            </Route>
        </Routes>
    );
}
export default RouterIndex
