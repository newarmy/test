<template>
    <div class="tpl1 con">
        <header-comp></header-comp>
        <news-comp></news-comp>
        <image-news-list-comp-two></image-news-list-comp-two>
        <image-news-list-comp-one></image-news-list-comp-one>
        <footer-comp></footer-comp>
    </div>
</template>

<script>
    import '../../assets/css/reset-wap.css'
    import '../../assets/css/news-style-one.css'
    import headerComp from '../components/header/imageHeader.vue'
    import newsComp from '../components/text-news-list/textListOne.vue'
    import imageNewsListCompOne from  '../components/image-and-text-list/twoColumnImageTextList.vue'
    import imageNewsListCompTwo from '../components/image-and-text-list/oneColumnImageTextList.vue'
    import footerComp from '../components/footer-template/wapFooterOne.vue'
    import LazyLoad from '../api/lazyLoad-wap'
    function $(id) {
        return document.querySelector(id);
    }
    export default {
        name: "news-template-one.vue",
        components: {
            headerComp,
            newsComp,
            imageNewsListCompOne,
            imageNewsListCompTwo,
            footerComp
        },
        mounted() {
            this.$nextTick(function () {
                var LazyObj = new LazyLoad({
                    parent : $('.tpl1')
                 });
                //初始执行显示屏幕内的图片
                 LazyObj.loadImgs();
            })
        }
    }
</script>

<style scoped>

</style>