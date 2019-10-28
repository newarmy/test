export default  {
    flagType: state => { // 定位的table
        let t = state.groupObj.flagType;
        t = t >= 1000 ? t : 1000;
        return t
    },
    initPicPos: (state, getters) => { // 定位的图片id
        let id = state.groupObj.picId;
        let pos = 0;
        if(Number(getters.modelRelation) === 1) {
            let t = state.groupObj.flagType;
            let arr = state.groupObj['pics'+t];
            if(Array.isArray(arr)) {
                arr.forEach(function (item, index) {
                    if(item.id === id) {
                        pos = index;
                    }
                });
            }
        } else {
            let arr = state.groupObj.totalPics
            arr.forEach(function (item, index) {
                if(item.id === id) {
                    pos = index;
                }
            });
        }

        return pos;
    },
    allImageArr: (state, getters) => {
        let allArr = [];
        if(Number(getters.modelRelation) === 1) {
            allArr = allArr.concat(state.pics1000, state.pics2000, state.pics3000, state.pics4000)
        } else {
            allArr = state.totalPics;
        }
        return allArr;
    },
    modelRelation: state => { // 组图是否关联车型	0：未关联组图；1：关联组图
        let mr = state.groupObj.modelRelation;
        return mr;
    },
    len1: state => {
        return state.groupObj.pics1000.length;
    },
    len2: state => {
        return state.groupObj.pics2000.length;
    },
    len3: state => {
        return state.groupObj.pics3000.length;
    },
    len4: state => {
        return state.groupObj.pics4000.length;
    },
    lenMore: state => {
        return state.groupObj.picsMore.length;
    },
    len: state => {
        return state.groupObj.totalPics.length;
    }
}