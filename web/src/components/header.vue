<template>
    <div class="header">
        <!-- <img src="../../static/img/logo.png" alt="icon" class="img"> -->
        <ul class="headerList">
            <!-- <li @click="isActive=!isActive" :class="isActive?'active':''">首页</li>
            <li @click="headerClick($event)">招聘启事</li>
            <li @click="headerClick($event)">关于我们</li>
            <li @click="headerClick($event)">企业用车</li>
            <li @click="headerClick($event)">下载APP</li> -->
            <li v-for="(item, index) in headerList" :key="index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            headerList: ['首页', '招聘启事', '关于我们', '企业用车', '下载APP'],
            isActive: false
        }
    }
    ,
    methods: {
        headerClick(e) {
            console.log(this.isActive)
            let el = e.target;
            el.style.color?el.style.color = '':el.style.color = '#EB613B';
        }
    }
}
</script>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
    }
    .img {
        width: 165px;
        height: 45px;
        margin-left: 50px;
    }
    .headerList {
        list-style: none;
        display: flex;
        padding: 0;
    }
    .headerList li {
        margin-left: 48px;
        letter-spacing: 0.45px;        
        color: #61646F;
    }
    .headerList li:hover {
        cursor: pointer;
    }
    .active {
        color:#EB613b;
    }
</style>
