<template>
    <ul>
        <li class="art-des">
            <p class="art-title">文章标题</p>
            <div class="des-con">这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥这是你的啥</div>
            <p class="art-oth">2018:09:24</p>
        </li>
    </ul>
</template>
<script>
export default {
    async({store}) {
        return store.dispatch('getArtList')
    },
    data () {
        blogList: []
    }
}
</script>
<style lang="less" scoped>
    .art-des {
        background: rgba(255,255,255,0.7);
        margin-bottom: 20px;
        .art-title {
            line-height: 26px;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .art-oth {
            line-height: 16px;
            border-top: 1px solid #ccc;
            margin-top: 10px;
            padding-top: 10px;
        }
    }
</style>


