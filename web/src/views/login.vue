<template>
    <div>
        <transition enter-active-class="animated tada">
            <div class="login-container" v-show="toggle">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="ruleForm">
                    <el-form-item  prop="userName">
                        <el-input type="text" v-model="ruleForm.userName" auto-complete="off" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="form-button">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
    </div>

</template>
<script>
import { login } from '../api/index.js'
    export default {
        name: 'login',
        data () {
            return {
                ruleForm: {
                    userName: '',
                    password: ''
                },
                toggle: false, // 进入页面时，动画的开关
                rules: {
                    userName: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted() {
            this.toggle = true;
        },
        methods: {
            async submitForm (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const response = await login(this.ruleForm);
                        if (response.data.data.success) {
                            this.$router.push('home')
                        } else {

                        }
                    }
                })
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>
<style lang="less" scoped>
    .login-container {
        width: 300px;
        height: 200px;
        background: rgba(21, 187, 43, 0.452);
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -100px;
        padding: 50px 30px;
        .ruleForm {
            .el-input__inner {
                background-color: rgba(21, 187, 43, 0.452) !important;
            }
            .form-button {
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>

