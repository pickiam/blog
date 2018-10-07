<template>
    <div>
        <p class="title">标签管理</p>
        <el-table :data="tableData" border medium>
            <el-table-column fixed prop="art_id" label="id" align="center"></el-table-column>
            <el-table-column  prop="art_title" label="标题" align="center"></el-table-column>
            <el-table-column  prop="art_create_time" label="创建时间" align="center"></el-table-column>
            <el-table-column  prop="art_update_time" label="更新时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleSticky(scope.$index, scope.row)">{{ scope.row.art_sticky === 1 ? 取消置顶 : 置顶 }}</el-button>
                    <el-button @click="handleStatus(scope.$index, scope.row)">{{ scope.row.art_status === 1 ? 下架 : 上架 }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { updateArticle } from '../api/index.js';
export default {
    asyncData ({ store }) {
        return store.dispatch('getArtList');
    },
    computed: {
        artList () {
            return this.$store.state.artList;
        }
    },
    methods: {
        async handleSticky(index, row) {
                let response = await updateArticle(localStorage.getItem('token'), {id: row.art_id, sticky: row.art_sticky === 1 ? 0 : 1});
                if (response.data.success) {
                    this.$store.dispatch('getArtList')
                }
        },
        async handleStatus(index, row) {
                let response = await updateArticle(localStorage.getItem('token'), {id: row.art_id, status: row.art_status === 1 ? 0 : 1});
                if (response.data.success) {
                    this.$store.dispatch('getArtList')
                }
        }
    }
}
</script>
