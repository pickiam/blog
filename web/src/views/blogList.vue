<template>
    <ul>
        <li class="art-des" v-for="(art, index) in artList" :key="index" @click="goDetail(art.art_id)">
            <p class="art-title">{{ art.art_title }}</p>
            <div class="des-con">{{ art.art_htmlDetail.substr(0, 400) }}</div>
            <p class="art-oth">
                <span>{{ art.art_create_time }}</span>
                <span @click.stop="handleEdit(art.art_id)" v-if="editButton">编辑</span>
            </p>
        </li>
    </ul>
</template>
<script>
import { accessControl } from '../api/index.js'
export default {
    asyncData ({store}) {
        return store.dispatch('getArtList', {status: 1})
    },
    data () {
        return {
            editButton: true,
            pageSize: 6,
            pageNum: 1
        }
    },
    computed: {
        artList () {
            return this.$store.state.artList
        }
    },
    async mounted() {
        if (localStorage.getItem('token') !== null) {
            let response = await accessControl(localStorage.getItem('token'));
            if (response.data.success) {
                this.editButton = true
            }
        }
    },
    methods: {
        goDetail (id) {
            this.$router.push({name: 'blogDetail', params: {id:id}})
        },
        handleEdit (id) {
            this.$router.push({name: 'edit', query: {id}})
        },
        pullUpLoading () {
            
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
            display: flex;
            justify-content: space-between;
            span {
                font-size: 14px;
            }
        }
    }
</style>


