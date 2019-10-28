<template>
    <div class="box" id="con3">
        <h3 class="tit"><span>特别策划</span></h3>
        <ul class="list2" id="feed3">
            <li>
                <a href="#" target="_blank" class="pic-link">
                    <!-- 真实的图片地址写到data-src="图片地址", 这样可以加快页面加载速度， 图片的宽高比是3:2-->
                    <img  data-src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg"
                          src="//m1.auto.itc.cn/appImage/sohu-default.png"
                          width="330" height="220">
                </a>
                <h3>
                    <a href="#" target="_blank">评奥迪Q2L/丰田等小型SUV  北京现代评奥迪Q2L</a>
                </h3>
            </li>
            <li>
                <a href="#" target="_blank" class="pic-link">
                    <!-- 真实的图片地址写到data-src="图片地址", 这样可以加快页面加载速度， 图片的宽高比是3:2-->
                    <img  data-src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg"
                          src="//m1.auto.itc.cn/appImage/sohu-default.png"
                          width="330" height="220">
                </a>
                <h3>
                    <a href="#" target="_blank">评奥迪Q2L/丰田等小型SUV  北京现代评奥迪Q2</a>
                </h3>
            </li>
            <li>
                <a href="#" target="_blank" class="pic-link">
                    <!-- 真实的图片地址写到data-src="图片地址", 这样可以加快页面加载速度， 图片的宽高比是3:2-->
                    <img  data-src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg"
                          src="//m1.auto.itc.cn/appImage/sohu-default.png"
                          width="330" height="220">
                </a>
                <h3>
                    <a href="#" target="_blank">评奥迪Q2L/丰田等小型SUV  北京现代评奥迪Q2</a>
                </h3>
            </li>
            <li>
                <a href="#" target="_blank" class="pic-link">
                    <!-- 真实的图片地址写到data-src="图片地址", 这样可以加快页面加载速度， 图片的宽高比是3:2-->
                    <img  data-src="http://i2.itc.cn/20170817/3640_ebf6e758_3e02_1a21_e626_573350edfa89_1.jpg"
                          src="//m1.auto.itc.cn/appImage/sohu-default.png"
                          width="330" height="220">
                </a>
                <h3>
                    <a href="#" target="_blank">评奥迪Q2L/丰田等小型SUV  北京现代评奥迪Q2</a>
                </h3>
            </li>
        </ul>
        <footer class="more"><div>查看更多</div></footer>
    </div>

</template>

<script>
    export default {
        name: "two-column-image-text-list"
    }
</script>

<style scoped>
    /*上图下文字碎片 start*/
    .list2{padding:0 0.3rem;overflow: hidden;}
    .list2 img{width: 3.3rem;height: 2.2rem;display: block;border:1px solid var(--tplColor);}
    .list2 h3{
        font-size: 0.3rem;color: var(--fontColor1);line-height: 0.55rem;

        margin-top: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 1.65rem；
    }
    .list2 h3 a{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        width:100%;
        height: 1.65rem;
    }
    .list2 h3 a{color: var(--fontColor1);}
    .list2 h4{height: 0.45rem;font-size: 0.24rem;color: var(--fontColor2);line-height: 0.45rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .list2 h4 a{color: var(--fontColor2);}
    .list2 li{margin-top: 0.35rem;width: 3.3rem;}
    .list2 li:first-child{margin-top: 0;}
    .list2 li:nth-child(2){margin-top: 0;}
    .list2 li:nth-child(2n){float: right;}
    .list2 li:nth-child(2n+1){float: left;}
    .pic-link{display: block;position: relative;}
    .pic-link .video{display: block;position: absolute;background: url("../../../assets/img/big-v.png") no-repeat 0 0;background-size: 0.82rem 0.82rem;top:50%;left: 50%;margin-top: -0.41rem;margin-left: -0.41rem;width: 0.82rem;height: 0.82rem;}
    /*上图下文字碎片 end*/
    .more {
        line-height: 1rem;
        height: 1rem;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
    }
</style>