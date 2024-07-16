import axiosInstance from "../../axios";
import IResult, {IPage} from "../model/IResult.ts";

export interface IFilmType {
    "id": string,
    "name": string,
    "createTime": string
}
export const resourcesTypeList = (data:unknown):Promise<IResult<IPage<IFilmType[]>>> => {
    return axiosInstance.post("/resources/type/list",data)
}
export const resourcesTypeDetail = (data:unknown):Promise<IResult<IFilmType>> => {
    return axiosInstance.post("/resources/type/detail",data)
}
export const resourcesTypeUpdate = (data:unknown):Promise<IResult<IFilmType>> => {
    return axiosInstance.post("/resources/type/update",data)
}
export const resourcesTypeAdd = (data:unknown):Promise<IResult<IFilmType>> => {
    return axiosInstance.post("/resources/type/add",data)
}
export const resourcesTypeDelete = (data:unknown):Promise<IResult<IFilmType>> => {
    return axiosInstance.post("/resources/type/delete",data)
}
