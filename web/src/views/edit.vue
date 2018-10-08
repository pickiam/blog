<template>
    <div>
        <div class="title-con">
            <p class="title">{{name}}</p>
            <p class="art-title">文章标题</p>
            <el-input placeholder="请输入标题" v-model="articleInfo.title"></el-input>
        </div>
        <p class="art-con">文章内容</p>
        <div class="editor-wrapper">
            <textarea id="editor" v-model="articleInfo.content" placeholder="Content here ...."></textarea>
        </div>
        <div>
            <p class="art-tag">文章标签</p>
            <el-checkbox-group v-model="articleInfo.tags">
                <el-checkbox v-for="tag in tags" :label="tag.tag_id" :key="tag.tag_id">{{tag.tag_value}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-row style="margin-top: 30px;">
            <el-button type="primary" @click="saveDraft">保存</el-button>
            <el-button @click="draftBox">草稿箱</el-button>
            <el-button type="primary" style="float:right;" @click="uploadModal = true">上传图片</el-button>
        </el-row>
        <el-dialog
            title="上传图片"
            :visible.sync="uploadModal"
            width="30%">
            <!-- <el-button type="primary">点击上传</el-button> -->
            <input type="file" name="file" @change="upload($event)">
            <input type="text" v-model="uploadImgUrl">
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadModal = false">取 消</el-button>
                <el-button type="primary" @click="uploadModal = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    import marked from 'marked';
    import env from '../config/env.js';
    import { uploadImg, addArticle } from '@/api/index.js'
    export default {
        name: 'edit',
        asyncData({ store, route }) {
            return Promise.all([store.dispatch('getTagsList')]);
        },
        computed: {
            tags () {
                return this.$store.state.tagsList;
            }
        },
        data () {
            return {
                editor: '',
                socket: '',
                uploadModal: false,
                uploadImgUrl: '',
                actionUrl: env.baseUrl + '/admin/uploadImg',
                articleInfo: {
                    title: '',
                    content: '',
                    tags: [],
                },
                timer: null,
                name: '新增文章'
            }
        },
        created () {
           
        },
        mounted () {
            var editor = require('../static/edit/edit.js');
            var marked = require('../static/edit/marked.js');
            this.editor = new editor.Editor();
            this.editor.render();
            this.socket = io(env.wsUrl);
            this.socket.on('connect', () => {
                this.socket.on('saveDraftPost', (res) => {
                    console.log(res);
                });
            });
            this.socket.emit('getDraftPost', this.$route.query.id);

            this.socket.on('getDraftPost', (data) => {
                if (data) {
                    this.articleInfo.title = data.selectResult.art_title;
                    this.articleInfo.content  = data.selectResult.art_detail;
                    this.articleInfo.tags = data.selectResult.art_tag.split(',');
                    this.articleInfo.tags = this.articleInfo.tags.reduce((index, currentValue, currentIndex) => {
                        index[currentIndex] = +currentValue
                        return index;
                    }, [])
                    console.log(this.articleInfo.tags)
                    this.editor.value(`${data.selectResult.art_detail}`);
                }
            })
            this.timer = setInterval(() => {
                this.articleInfo.content = this.editor.value();
            }, 1000);

            if (this.$route.query.id) {
                this.name = '编辑文章';
            } else {}
        },
        methods: {
            async getArticleInfo (id) {
                let res = await getArticleInfo(id);
                this.articleInfo = res.data.articleInfo;
            },
            async saveDraft () {
                try {
                    let response = await addArticle(localStorage.getItem('token'), this.articleInfo)
                    if (response.data.success) {
                        this.socket.emit('clearDraftPost', async () => {
                            this.socket.on('clearDraftPost', async (data) => {
                                console.log('保存成功')
                            })
                        })
                        this.$router.push({name: 'blogList'})
                    }
                } catch (error) {
                    console.log(error);
                }
                
            },
            async draftBox () {
                try {
                    let params = Object.assign({}, this.articleInfo, {status: 0});
                    let res = await addArticle(params);
                    if (res.data.success) {
                        this.socket.emit('clearDraftPost', async () => {
                            this.socket.on('clearDraftPost', async (data) => {
                                console.log('保存草稿箱成功')
                            })
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async upload (event) {
                let formData = new FormData();
                formData.append('file', event.target.files[0]);
                try {
                    let response = await uploadImg(formData);
                    if (response.data.success) {
                        this.uploadImgUrl = env.baseUrl + '/'  + response.data.data;
                    }
                } catch (error) {
                    console.log(error)
                }
                
            }
        },
        watch: {
            articleInfo: {
                handler: function(oldVal, newVal) {
                    this.socket.emit('saveDraftPost', this.articleInfo);
                },
                deep: true
            }
        },
        destroyed () {
            clearInterval(this.timer);
        },
    }
</script>
<style lang="less" scoped>
@import url(../static/edit/edit.css);
.title-con {
    margin-bottom: 20px;
    .title {
        font-size: 20px;
        color: #808080
    }
}
.editor-wrapper {
    background: rgba(255, 255, 255, 0.5)
}
.art-title, .art-con, .art-tag {
    font-size: 16px;
    margin-bottom: 15px;
    margin-top: 15px;
    background:burlywood;
    line-height: 25px;
    color: #fff;
}
</style>

