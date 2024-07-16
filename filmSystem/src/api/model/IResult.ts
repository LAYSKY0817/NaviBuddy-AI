
export default interface IResult<T> {
    message:string,
    code:number,
    data: T
}
export interface IPage<T>{
    "total": number,
    "list":T
}
