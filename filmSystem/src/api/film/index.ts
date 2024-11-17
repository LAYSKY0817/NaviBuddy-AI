import axiosInstance from "../../axios";
import IResult, {IPage} from "../model/IResult.ts";

export interface IFilm {
    "id": string,
    "title": string,
    "coverUrl": string,
    "resourcesUrl": string,
    "state": number,
    "createdTime": number,
    "updatedTime": number,
    "introduce": string,
    "type": string,
    "createdBy": string,
    "updatedBy": string
}
export const resourcesList = (data:unknown):Promise<IResult<IPage<IFilm[]>>> => {
    return axiosInstance.post("/resources/list",data)
}
export const resourcesDetail = (data:unknown):Promise<IResult<IFilm>> => {
    return axiosInstance.post("/resources/detail",data)
}
export const resourcesUpdate = (data:unknown):Promise<IResult<IFilm>> => {
    return axiosInstance.post("/resources/update",data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const resourcesAdd = (data:unknown):Promise<IResult<IFilm>> => {
    return axiosInstance.post("/resources/add",data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const resourcesDelete = (data:unknown):Promise<IResult<IFilm>> => {
    return axiosInstance.post("/resources/delete",data)
}
