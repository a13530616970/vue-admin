<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="login-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
                <el-form-item prop="username">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" v-if="model!=='注册'">
                    <label for="passwords">重复密码</label>
                    <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <label for="code">验证码</label>
                    <el-row :gutter="24">
                        <el-col :span="15">
                            <el-input id="code" type="text" v-model="ruleForm.code" autocomplete="off" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" :disabled="codeButtonStatu.statu" @click="getSms()">{{codeButtonStatu.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" :disabled="submitButtonStatus" class="block commit">{{model}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { GetSms, Register, Login } from "@/api/login.js";
import {
    validateUsernameReg,
    validatePassReg,
    validateCodeReg
} from "@/utils/validator.js";

export default {
    name: "login",
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入用户名"));
            } else if (!validateUsernameReg(value)) {
                return callback(new Error("用户名格式有误"));
            } else {
                return callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!validatePassReg(value)) {
                callback(new Error("密码为6至20的数字+字母"));
            } else {
                callback();
            }
        };
        var validatePassS = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (this.ruleForm.password != value) {
                callback(new Error("和第一次输入密码不一样"));
            } else {
                callback();
            }
        };
        var validateCode = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else if (!validateCodeReg(value)) {
                callback(new Error("验证码格式有误"));
            } else {
                callback();
            }
        };
        return {
            menuTab: [
                {
                    txt: "登录",
                    current: true
                },
                {
                    txt: "注册",
                    current: false
                }
            ],
            codeButtonStatu: { 'statu': false, 'text': '获取验证码' },
            submitButtonStatus: false,
            timer: null,
            model: "登录",
            ruleForm: {
                username: "",
                password: "",
                passwords: "",
                code: ""
            },
            rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }],
                passwords: [{ validator: validatePassS, trigger: "blur" }],
                code: [{ validator: validateCode, trigger: "blur" }]
            }
        };
    },
    created() { },
    mounted() { },
    methods: {
        toggleMenu(item) {
            //切换清空内容
            this.$refs["loginForm"].resetFields();
            this.menuTab.forEach(element => {
                element.current = false;
            });
            this.model = item.txt;
            item.current = true;
        },
        submitForm(formName) {

            this.$refs[formName].validate(valid => {
                if (valid) {

                    if (this.model == '登录') {
                        this.login();
                    } else {
                        this.register();
                    }

                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        register() {
            let data = {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                code: this.ruleForm.code
            }
            Register(data).then(res => {
                this.$message.success(res.message)
                this.toggleMenu(this.menuTab[0])
                this.clearCountDown()
            }).catch(error => {

            })
        },
        login() {
            let data = {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                code: this.ruleForm.code
            }
            Login(data).then(res => {
                console.log(res);

            }).catch(error => {

            })
        },
        getSms() {
            if (this.ruleForm.username.trim() == "")
                return this.$message.error("邮箱不能为空！！");
            if (!validateUsernameReg(this.ruleForm.username))
                return this.$message.error("邮箱格式错误，请重新输入！！");
            var data = {
                username: this.ruleForm.username,
                module: this.model == "登录" ? "login" : "register"
            };
            GetSms(data)
                .then(res => {
                    this.$message.success(res.message);
                    this.codeButtonStatu.statu = true;
                    this.codeButtonStatu.text = '发送中';
                    this.submitButtonStatus = false;
                    this.countDown(60)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        countDown(number) {
            let time = number
            if (this.timer) this.clearCountDown()
            this.timer = setInterval(() => {
                time--
                if (time == 0) {
                    this.codeButtonStatu.statu = false;
                    this.codeButtonStatu.text = '再次获取';
                    this.clearCountDown()
                } else {
                    this.codeButtonStatu.text = `倒计时${time}`;
                }
            }, 1000)

        },
        clearCountDown() {
            this.codeButtonStatu.text = '获取验证码';
            this.codeButtonStatu.statu = false;
            clearInterval(this.timer)

        }
    }
};
</script>

<style lang='scss' scoped>
#login {
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.login-tab {
    text-align: center;

    li {
        display: inline-block;
        cursor: pointer;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 2px;
    }
}
.current {
    background-color: rgba(0, 0, 0, 0.1);
}

.login-form {
    margin-top: 15px;
    label {
        display: block;
        font-size: 14px;
        color: #ffffff;
    }
}
.el-form-item {
    margin-bottom: 15px;
}
.block {
    display: block;
    width: 100%;
}
.commit {
    margin-top: 10px;
}
</style>