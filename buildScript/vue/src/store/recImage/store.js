//推荐列表
export default  {
    namespaced: true,
    state: {
        recList: []
    },
    mutations: {
        setRecList(state, payload) {
            state.recList = payload;
        }
    },
    actions: {
        setRecList ({commit}, data) {
            commit('setRecList', data)
        }
    }
};