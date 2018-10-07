<template>
    <ul>
        <li class="art-des" v-for="(art, index) in artList" :key="index" @click="goDetail(art.art_id)">
            <p class="art-title">{{ art.art_title }}</p>
            <div class="des-con">{{ art.art_detail.substr(0, 400) }}</div>
            <p class="art-oth">{{ art.art_create_time }}</p>
        </li>
    </ul>
</template>
<script>
export default {
    asyncData ({store}) {
        return store.dispatch('getArtList')
    },
    computed: {
        artList () {
            return this.$store.state.artList
        }
    },
    mounted() {
        console.log(this.artList)
    },
    methods: {
        goDetail (id) {
            console.log(id)
            this.$router.push({name: 'blogDetail', params: {id:id}})
        }
    }
}
</script>
<style lang="less" scoped>
    .art-des {
        background: rgba(255,255,255,0.7);
        margin-bottom: 20px;
        cursor: pointer;
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


