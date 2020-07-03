import requset from '@/utils/request.js'

// 获取验证码
export function GetSms(data) {
    return requset({
        method: 'post',
        url: '/getSms/',
        data
    })
}