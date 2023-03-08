export default {
    namespaced: true,
    state: {
        catagtory: [],//存放头部分类
        currentCatagtory: '',//存储当前激活的分类
    },
    mutations: {
        //更新头部分类数组  payload更新的数组
        updateCatagtory(state, payload) {
            state.catagtory = payload
        },
        //更改当前激活的状态
        updateCurrent(state, payload) {
            state.currentCatagtory = payload
        }
    },
    actions: {

    }
}