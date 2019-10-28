<template>
    <div class="top-area">
        <img src="../../../assets/images/banner.png" class="top-pic"/>
        <normal-focus></normal-focus>
    </div>
</template>

<script>
    import normalFocus from '../focus/normalFocus.vue'
    export default {
        name: "imageHeader.vue",
        components: {
            normalFocus
        }
    }
</script>

<style scoped>
    .top-area .top-pic{width: 100%;height: auto;display: block;margin-bottom: 0.3rem;}
</style>