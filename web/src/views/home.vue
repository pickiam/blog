<template>
    <div>这是主页</div>
</template>

<script>
import { artList } from '../api/index.js';
    export default {
        name: 'home',
        data () {
            return {

            }
        },
        mounted() {
            artList()
        },
    }
</script>
