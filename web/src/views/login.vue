<template>
    <div>
        <el-input v-model="userName" placeholder="账号"></el-input>
        <el-input v-model="passWord" placeholder="密码"></el-input>
        <el-button type="primary" @click.native="login">提交</el-button>
    </div>
</template>
<script>
import {login} from '../api/index.js'
    export default {
        name: 'login',
        data () {
            return {
                userName: '',
                passWord: ''
            }
        },
        methods: {
            login () {
                login({userName: this.userName, passWord: this.passWord})
            }
        }
    }
</script>
