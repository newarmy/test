import {requestComment} from "../../api/request";
import handlerData from '../../api/handler/handlerCommentsData'
export default  {

    setListComments: function ({commit}, data) {
        commit('setComments', data)
    },
    setNoMoreComments ({commit}, data) {
        commit('setNoMoreBtn', data)
    },
    setCommentNum ({commit}, data) {
        commit('setCommentNum', data);
    },
    setLikeComment({commit}, commentId) {
        commit('setLikeComment', commentId);
    },
    setNoComments({commit}, data){
        commit('setNoComments', data)
    },
    addComment({commit}, data) {
        commit('addComment', data)
    },
    addCommentNum({commit}) {
        commit('addCommentNum')
    },
    setMoreCommentsBtn ({dispatch, commit}, opt) {
        requestComment(opt.newsId, opt.pageSize, opt.pageNo).then(function (response) {
            let result = response.data;
            if (result.code !== 200) {
                dispatch('setNoMoreComments', false);
            } else {
                if (!result.data) {
                    dispatch('setNoMoreComments', false);
                    return;
                }
                if (opt.pageNo === result.data.totalPageNo) {
                    dispatch('setNoMoreComments', false);
                } else {
                    dispatch('setNoMoreComments', true);
                }
                let list = handlerData(result.data);
                dispatch('setListComments', list)
            }

        }).catch(function () {
            dispatch('setNoMoreComments', false);
        });
    }
}