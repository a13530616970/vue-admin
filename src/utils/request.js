import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

//创建axios 实例对象
const service = axios.create({
    baseURL: BASEURL,
    timeout: 1000

});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应成功做点什么
    const res = response.data
    if (res.resCode != 0) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
    }
    else
        return res;

}, function (error) {
    // 对响应错误做点什么
    console.log('err' + error) // for debug
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error);
});

export default service