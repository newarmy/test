<template>
    <div class="focus-box">
        <ul class="focus" id="focus" >
            <!-- 焦点图 新闻 start-->
            <li>
                <a href="#" target="_blank">
                    <img src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg" width="750" height="370">

                    <p class="title">讴歌全新MDX采用全新的设计语言</p>
                </a>
            </li>
            <li>
                <a href="#" target="_blank">
                    <img src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg" width="750" height="370">

                    <p class="title">美女</p>
                </a>
            </li>
            <!-- 焦点图 新闻 start-->
        </ul>
        <div class="focus-nav" id="focus-nav"></div>
    </div>
</template>

<script>
    import Slide from '../../api/slide/slide'
    function $(id) {
        return document.querySelector(id);
    }
    export default {
        name: "normal-focus.vue",
        mounted() {
            this.$nextTick(function () {
                new Slide({
                    el: $('#focus'),
                    nav: $('#focus-nav'),
                    navType: 'normal'
                });

            })
        }
    }
</script>

<style >
    /*焦点图 start*/
    .focus-box{
        position:relative;
        width: var(--focusWidth);
        margin: 0 auto;
        overflow:hidden;
    }

    .focus {
        height:100%;
        width:800%;
        overflow:hidden;
        position:relative;
        -webkit-transform:translate3d(0,0,0);
        -ms-transform:translate3d(0,0,0);
        -webkit-transition:-webkit-transform 0 cubic-bezier(0,0,.25,1);
        -ms-transition:-ms-transform 0 cubic-bezier(0,0,.25,1);
    }
    .focus li{
        float:left;
        position:relative;
        width: var(--focusWidth);

    }
    .focus li img{width:100%;height:4.6rem;display:block;}
    .focus .title {
        width: var(--focusWidth);
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;;
        height: 1.2rem;
        line-height: 1.0rem;
        font-size:.32rem;text-align: center;
        color:#fff;position: absolute;bottom: 0;left: 0;
        background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,1)); /* Safari 5.1 - 6 */
        background: -o-linear-gradient(bottom,rgba(0,0,0,0),rgba(0,0,0,1)); /* Opera 11.1 - 12*/
        background: -moz-linear-gradient(bottom,rgba(0,0,0,0),rgba(0,0,0,1)); /* Firefox 3.6 - 15*/
        background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)); /* 标准的语法 */
    }
    .focus-nav{
        z-index:10;
        width: 100%;
        height:.40rem;
        line-height:.40rem;
        text-align: center;
    }
    .focus-nav span{
        display:inline-block;
        width:.18rem;
        height: .18rem;
        background-color:var(--focusSpot);
        border-radius: 50%;
        margin:0 0.06rem;
    }
    .focus-nav .on{
        background-color: var(--tplColor);
    }
</style>