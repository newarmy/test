
export default  {
    namespaced: true,
    state: {
        content: '', //提示内容
        type: '', //提示类型
    },
    mutations: {
        setContent(state, payload) {
            state.content = payload;
        },
        setType(state, payload) {
            state.type = payload;
        },
    },
    actions: {
        setContent ({commit}, data) {
            commit('setContent', data)
        },
        setType({commit}, data) {
            commit('setType', data)
        },

    }
};