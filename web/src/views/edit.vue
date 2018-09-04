<template>
    <div class="editor-wrapper">
        <textarea id="editor" v-model="articleInfo.content" placeholder="Content here ...."></textarea>
    </div>
</template>
<script>
    import io from 'socket.io-client';
    import marked from 'marked';
    import env from '../config/env.js';
    import  { getArticleInfo } from '../api/index.js'
    export default {
        name: 'edit',
        data () {
            return {
                editor: '',
                socket: '',
                articleInfo: {
                    title: '',
                    content: '',
                    tags: ''
                },
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
            this.socket = io(env.wsUrl, {
                path: env.wsPath
            });
            this.socket.on('connection', () => {
                
            });
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
                handler: () => {

                },
                deep: true
            }
        }
    }
</script>
<style lang="less" scoped>
@import url(../static/edit/edit.css);
</style>

