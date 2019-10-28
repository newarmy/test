import handlerRecList from '../api/handler/handlerRecList'

export  default {
    getGroupImage: function ({commit}, data) {
        if(data.modelRelation === 1) {
            let tempMoreArr = handlerRecList(data.pics4000[data.pics4000.length-1]);
            let tempArr = data.pics4000.slice(0, data.pics4000.length-1);
            data.pics4000 = tempArr;
            data.picsMore = tempMoreArr;
        } else {
            let tempMoreArr =  handlerRecList(data.totalPics[data.totalPics.length-1]);
            let tempArr = data.totalPics.slice(0, data.totalPics.length-1);
            data.totalPics = tempArr;
            data.picsMore = tempMoreArr;
            commit('setPicsMore', data.picsMore)
        }
        commit('setGroup', {data: data});
        if ( data.modelRelation === 1) {
            let type = data.flagType ? data.flagType : 1000;
            switch (type) {
                case 1000:
                    commit('setPics1', data.pics1000);
                    break;
                case 2000:
                    commit('setPics2', data.pics2000);
                    break;
                case 3000:
                    commit('setPics3', data.pics3000);
                    break;
                case 4000:
                    commit('setPics4', data.pics4000);
            }
        } else {
            commit('totalPics', data.totalPics);
        }

    },
    getTopic: function ({commit}, data) {
        commit('setTopic', data)
    },
    setShare ({commit}, data) {
        commit('setIsShowShare', data);
    },
    setScreen ({commit}, data) {
        commit('setIsShowScreen', data);
    },
    setImageUrl ({commit}, data) {
        commit('setImageUrl', data);
    },
    setlandscapeLayer({commit}, data) {
        commit("setlandscapeLayer", data);
    },
    //视频相关
    setVideoData ({commit}, data) {
        commit('setVideoData', data);
    },
    setVideoLayer ({commit}, data) {
        commit('setVideoLayer', data);
    },


}