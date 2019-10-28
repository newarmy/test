import Vue from 'vue'
import appComp from '../views/news-template-one.vue'
new Vue({
    el: '#app',
    components: {
        appComp
    },
    created: function () {

    },
    mounted () {
        //为了生成静态html文件
        document.dispatchEvent(new Event('render-event'))
    },
    render: h => h('appComp')
});