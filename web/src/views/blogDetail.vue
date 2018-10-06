<template>
    <div class="artDetailBg">
        <p class="artDetailTitle">{{artDetail.art_title}}</p>
        <div class="artDetailContent">{{artDetail.art_detail}}</div>
    </div>
</template>
<script>
export default {
    name: 'blogDetail',
    asyncData ({store, route}) {
        return store.dispatch('getArtDetails', route.params.id)
    },
    computed: {
        artDetail () {
            return this.$store.state.artDetail
        }
    }
}
</script>
<style lang="less">
    .artDetailBg {
        background: rgba(255, 255, 255, 0.7);
        padding: 20px;
        .artDetailTitle {
            line-height: 30px;
            font-size: 20px;
            color: #1c7791;
            font-weight: bold;
            border-bottom: 1px solid #999;
            padding-left: 5px;
            border-left: 5px solid #1fa6e6;
        }
        .artDetailContent {
            margin-top: 30px;
        }
    }
</style>

