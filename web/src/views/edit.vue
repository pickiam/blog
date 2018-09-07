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
                    tags: '',
                },
                timer: '',
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
</style>

