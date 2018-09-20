<template>
    <div>
        <div class="title-con">
            <p class="title">{{name}}</p>
            <el-input placeholder="请输入标题" v-model="articleInfo.title"></el-input>
        </div>
        <div class="editor-wrapper">
            <textarea id="editor" v-model="articleInfo.content" placeholder="Content here ...."></textarea>
        </div>
        <div>
            <el-checkbox-group v-model="articleInfo.tags">
                <el-checkbox v-for="tag in tags" :label="tag" :key="tag">{{tag}}</el-checkbox>
            </el-checkbox-group>
        </div>

    </div>
</template>
<script>
    import io from 'socket.io-client';
    import marked from 'marked';
    import env from '../config/env.js';
    export default {
        name: 'edit',
        asyncData({ store, route }) {
            return Promise.all([store.dispatch('getTagsList')]);
        },
        computed: {
            tags () {
                return this.$store.state.tags;
            }
        },
        data () {
            return {
                editor: '',
                socket: '',
                articleInfo: {
                    title: '',
                    content: '',
                    tags: '',
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
            this.socket.emit('getDraftPost');

            this.socket.on('getDraftPost', (data) => {
                console.log(data);
            })
            this.timer = setInterval(() => {
                this.articleInfo.content = this.editor.value();
            }, 1000);

            if (this.$route.query.id) {
                this.name = '编辑文章';
                this.getArticleInfo(this.$route.query.id);
            } else {
                this.articleInfo = {
                    title: '',
                    content: '',
                    tags: ''
                }
            }
        },
        methods: {
            submit () {
            },
            async getArticleInfo (id) {
                let res = await getArticleInfo(id);
                this.articleInfo = res.data.articleInfo;
            }
        },
        watch: {
            articleInfo: {
                handler: function(oldVal, newVal) {
                    this.socket.emit('saveDraftPost', newVal);
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
</style>

