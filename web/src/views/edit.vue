<template>
    <div class="editor-wrapper">
        <input class="title" type="text" placeholder="Title" />
        <textarea id="editor" placeholder="Content here ...."></textarea>
    </div>
</template>
<script>
    import marked from 'marked'
    export default {
        name: 'edit',
        data () {
            return {
                editor: ''
            }
        },
        created () {
           
        },
        mounted () {
            var editor = require('../static/edit/edit.js');
            var marked = require('../static/edit/marked.js')
            this.editor = new editor.Editor();
            this.editor.render();
        }
    }
</script>
<style lang="less" scoped>
@import url(../static/edit/edit.css);
</style>

