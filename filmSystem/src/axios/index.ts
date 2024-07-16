import axios, {AxiosInstance,  AxiosResponse} from 'axios';
import qs from 'qs'

import { showMessage } from "./status";
import { message } from 'antd';


// 返回res.data的interface
const baseUrl:string = "http://127.0.0.1:8110/filmSystem"
const axiosInstance:AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
        function(data,headers) {
            if(headers["Content-Type"]==="application/x-www-form-urlencoded") {
                //由于使用的 form-data传数据所以要格式化
                return qs.stringify(data);
            } else if(headers["Content-Type"]==="multipart/form-data") {
                return data;
            } else {
                return JSON.stringify(data)
            }
        }
    ]
});


// axios实例拦截响应
axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.status === 200) {
            if(response.data.code===402) {
                message.error(showMessage(402));
                window.location.hash="/login"
            }
            return response.data;
        } else {
            message.error(showMessage(response.status));
            return response;
        }
    },
    // 请求失败
    async (error:{response:{status:number,data:unknown}}) => {
        const {response} = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围;
            message.error(showMessage(response.status));
            return Promise.reject(response.data);
        } else {
            message.error('网络连接异常,请稍后再试!');
        }
    }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token
        }
        return config;
    },
    (error:unknown) => {
        return Promise.reject(error);
    }
)
export default axiosInstance

