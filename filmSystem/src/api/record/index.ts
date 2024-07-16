import axiosInstance from "../../axios";
import IResult, {IPage} from "../model/IResult.ts";

export interface IRecord {
    "id": string,
    "name": string,
    "type": string,
    "createdTime": string
}
export interface IData {
    "id": string,
    "value": string,
    "recordId": string
}
export interface ICorrectionData {
    "realValue": string,
    "forecastValue": string,
    "forecast": string,
    "id": string,
    "recordId" :string
}
export const recordList = (data:unknown):Promise<IResult<IPage<IRecord[]>>> => {
    return axiosInstance.post("/record/list",data)
}

export const dataList = (data:unknown):Promise<IResult<IData[]>> => {
    return axiosInstance.post("/data/list",data)
}
export const correctionList = (data:unknown):Promise<IResult<ICorrectionData[]>> => {
    return axiosInstance.post("/correction/data/list",data)
}

export const recordAdd = (data:unknown):Promise<IResult<null>> => {
    return axiosInstance.post("/record/add",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}
export const addCorrection = (data:unknown):Promise<IResult<null>> => {
    return axiosInstance.post("/record/addCorrection",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}

