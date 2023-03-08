import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import catagtory from './modules/catagtory'
import newlist from './modules/newlist'
const store = new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        catagtory,
        newlist
    }
})
export default store
