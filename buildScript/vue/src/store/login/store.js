
export default  {
    namespaced: true,
    state: {
        isShowLoginLayer: false, //是否显示登录
        isLoginSuccess: false, //是否登录成功
    },
    mutations: {
        setLoginLayer(state, payload) {
            state.isShowLoginLayer = payload;
        },
        setLoginSuccess(state, payload) {
            state.isLoginSuccess = payload;
        },
    },
    actions: {
        setLogin ({commit}, data) {
            commit('setLoginLayer', data)
        },
        setLoginSuccess({commit}, data) {
            commit('setLoginSuccess', data)
        },

    }
};