import axiosInstance from "../../axios";
import IResult, {IPage} from "../model/IResult.ts";

export interface IPartType {
    createdAt: string
    createdBy: string
    typeCover: string
    typeDescription: string
    id : string
    typeName: string
    typeResources: string
    updatedAt: string
    updatedBy: string
}

export const parkTypesList = (data: unknown): Promise<IResult<IPage<IPartType[]>>> => {
    return axiosInstance.post("/park/types/list", data)
}
export const parkTypesDetail = (data: unknown): Promise<IResult<IPartType>> => {
    return axiosInstance.post("/park/types/detail", data)
}
export const parkTypesUpdate = (data: unknown): Promise<IResult<IPartType>> => {
    return axiosInstance.post("/park/types/update", data)
}
export const parkTypesAdd = (data: unknown): Promise<IResult<IPartType>> => {
    return axiosInstance.post("/park/types/add", data)
}
export const parkTypesDelete = (data: unknown): Promise<IResult<IPartType>> => {
    return axiosInstance.post("/park/types/delete", data)
}
