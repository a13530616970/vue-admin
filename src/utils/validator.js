export function validateUsernameReg(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value)
}

export function validatePassReg(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value)
}

export function validateCodeReg(value){
    let reg = /^[a-z0-9]{6}$/;
    return reg.test(value)
}