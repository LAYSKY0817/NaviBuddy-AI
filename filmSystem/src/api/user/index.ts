import axiosInstance from "../../axios";
import IResult, {IPage} from "../model/IResult.ts";
interface ILogin {
    userId:string,
    token:string
}
export interface IUser {
    "id": string,
    "username": string,
    "password": string|null,
    "nickName": string,
    "phone": string,
    "sex": number|null,
    "role": string|null,
    "email": string|null,
    "state": number,
    "createdTime": string,
    "updateTime": string|null
}
export const login = (data:unknown):Promise<IResult<ILogin>> => {
    return axiosInstance.post("/user/login",data)
}
export const register = (data:unknown):Promise<IResult<null>> => {
    return axiosInstance.post("/user/register",data)
}
export const userList = (data:unknown):Promise<IResult<IPage<IUser[]>>> => {
    return axiosInstance.post("/user/list",data)
}
export const userDetail = (data:unknown):Promise<IResult<IUser>> => {
    return axiosInstance.post("/user/detail",data)
}
export const userUpdate = (data:unknown):Promise<IResult<IUser>> => {
    return axiosInstance.post("/user/update",data)
}
export const userAdd = (data:unknown):Promise<IResult<IUser>> => {
    return axiosInstance.post("/user/add",data)
}
export const userDelete = (data:unknown):Promise<IResult<IUser>> => {
    return axiosInstance.post("/user/delete",data)
}
