import mutations from './mutations';
import actions from './actions'
export default  {
    namespaced: true,
    state: {
        comments: [],
        noComments: false,
        noMoreBtn: true,
        commentNum: 0,
    },
    mutations: mutations,
    actions: actions
};