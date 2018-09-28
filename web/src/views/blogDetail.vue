<template>
    
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
