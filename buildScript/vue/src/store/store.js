import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import comments from './comment/store'
import login from './login/store'
import hint from './hint/store'
import rec from './recImage/store'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        commentModule: comments,
        loginModule: login,
        hintModule: hint,
        recModule: rec
    },
    state: {
        showMore: true,
        groupObj: {},
        pics1000: [], // 外观
        pics2000: [], // 内饰
        pics3000: [], // 发动机
        pics4000: [], // 空间
        picsMore: [], //更多图片
        totalPics: [], // 不关联车型的数据数组,
        topic: {}, // 获取活动文案
        //qrcodeUrl: qrCodeImageUrl,
        isShowShareLayer: false, //是否显示分享层
        isShowScreenLayer: false, //是否显示全屏层
        fullImageUrl: '', // 大图
        isShowLandscapeLayer: false, //是否显示横屏浮层

        isShowVideoLayer: false, //是否显示视频浮层
        videoData: null,
    },
    getters: getters,
    mutations: mutations,
    actions: actions

});

export default store;