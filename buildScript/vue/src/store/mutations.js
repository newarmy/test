export default   {
    /**
     * isShowVideoLayer: false, //是否显示视频浮层
     videoFileId: '',
     videoAppId: ''
     * */
    setVideoLayer(state, payload) {
        state.isShowVideoLayer = payload;
    },
    setVideoData(state, payload) {
        state.videoData = payload;
    },
    setlandscapeLayer(state, payload) {
        state.isShowLandscapeLayer = payload
    },
    setImageUrl(state, payload){
        state.fullImageUrl = payload;
    },
    setIsShowShare(state, payload) {
        state.isShowShareLayer = payload;
    },
    setIsShowScreen(state, payload) {
        state.isShowScreenLayer = payload;
    },
    setShowMore(state, payload) {
        state.showMore = payload;
    },
    setGroup (state, payload) {
        state.groupObj = payload.data;
    },
    setPics1 (state, payload) {
        if(payload) {
            state.pics1000 = payload;
        } else {
            state.pics1000 = state.groupObj.pics1000
        }
    },
    setPics2 (state, payload) {
        if(payload) {
            state.pics2000 = payload;
        } else {
            state.pics2000 = state.groupObj.pics2000
        }
    },
    setPics3 (state, payload) {
        if(payload) {
            state.pics3000 = payload;
        } else {
            state.pics3000 = state.groupObj.pics3000
        }
    },
    setPics4 (state, payload) {
        if(payload) {
            state.pics4000 = payload;
        } else {
            state.pics4000 = state.groupObj.pics4000
        }
    },
    setPicsMore (state, payload) {
        if(payload) {
            state.picsMore = payload;
        } else {
            state.picsMore = state.groupObj.picsMore
        }
    },
    totalPics (state, payload) {
        if(payload) {
            state.totalPics = payload;
        } else {
            state.totalPics = state.groupObj.totalPics
        }
    },
    setTopic (state, payload) {
        state.topic = payload;
    }
};