<template>
    <div>
        <p class="title">标签管理</p>
        <el-table :data="tableData" border medium>
            <el-table-column fixed prop="tag_value" label="名称" align="center"></el-table-column>
            <el-table-column  prop="tag_count" label="数量" align="center"></el-table-column>
            <el-table-column  prop="tag_status" label="状态" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <p class="title">添加标签</p>
            <div>
                <el-input placeholder="请输入标签" v-model="tag.tagContent"></el-input>
                <el-radio-group v-model="tag.status" style="margin-top: 10px;">
                    <el-radio :label="1">有效</el-radio>
                    <el-radio :label="0">无效</el-radio>
                </el-radio-group>
                <el-row style="margin-top:20px;">
                    <el-button plain @click.native="add">ADD</el-button>
                </el-row>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-input placeholder="请输入标签" v-model="content.tagValue"></el-input>
            <el-input v-model="content.tagCount" disabled style="margin-top: 10px;"></el-input>
            <el-radio-group v-model="content.tagStatus" style="margin-top: 10px;">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">无效</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addTag, deleteTag, updateTag } from '../api/index.js'
export default {
    asyncData({store}) {
        return store.dispatch('getTagsList')
    },
    data () {
        return {
            tag: {
                tagContent: '',
                status: 1 // 默认有效
            },
            content: {
                tagValue: '',
                tagStatus: '',
                tagCount: '',
                tagId: ''
            },
            dialogVisible: false
        }
    },
    computed: {
        tableData () {
            return this.$store.state.tagsList
        }
    },
    methods: {
        async add () {
            if (this.tag.tagContent) {
                const response = await addTag(this.tag);
                if (response.data.success) {
                    this.$message.success({
                        message: response.data.message
                    })
                };
                this.$store.dispatch('getTagsList');
            } else {
                this.$message.error({
                    message: '标签值不能为空'
                });
            }
                
        },
        async handleDel (index, row) {
            const res = await deleteTag(row.tag_id);
            if (res.data.success) {
                this.$message.success({
                    message: res.data.message
                });
                this.tableData.splice(index, 1);
            }
        },
        async handleEdit (index, row) {
            this.dialogVisible = true;
            this.content.tagValue = row.tag_value;
            this.content.tagStatus = row.tag_status;
            this.content.tagCount = row.tag_count;
            this.content.tagId = row.tag_id;
        },
        async updateSubmit () {
            if (this.content.tagValue && typeof (this.content.tagStatus) === 'number') {
                console.log(this.content)
                let res = await updateTag(this.content);
            } else {
                this.$message.error({
                    message: '标签值和状态不能为空'
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .title {
        font-size: 20px;
        color: #808080;
    }
</style>

