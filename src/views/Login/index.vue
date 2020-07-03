<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="login-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMneu(item)">{{item.txt}}</li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
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
                            <el-input id="code" v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="block commit">{{model}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { GetSms } from "@/api/login.js";
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
    created() {},
    mounted() {},
    methods: {
        toggleMneu(item) {
            this.menuTab.forEach(element => {
                element.current = false;
            });
            this.model = item.txt;
            item.current = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
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
                    alert(res.message);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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