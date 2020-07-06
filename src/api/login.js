import requset from '@/utils/request.js'

// 获取验证码
export function GetSms(data) {
    return requset({
        method: 'post',
        url: '/getSms/',
        data
    })
}
// 注册
export function Register(data) {
    return requset({
        method: 'post',
        url: '/register/',
        data
    })
}
// 登录
export function Login(data) {
    return requset({
        method: 'post',
        url: '/login/',
        data
    })
}