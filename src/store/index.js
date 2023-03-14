import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

//引入封装的本地储存方法
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)

import catagtory from './modules/catagtory'
import newlist from './modules/newlist'

//定义存储用户信息到本地存储的变量名
const TOKEN_KEY = 'toutiao_user'

const store = new Vuex.Store({
    state: {
        user: getItem(TOKEN_KEY),//对象 存储当前的登录用户信息(token等数据)
    },
    mutations: {
        //更新user
        setUser(state, data) {
            console.log('调用了vuex中更改user的方法');
            state.user = data

            //防止刷新丢失  数据备份到本地存储
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {

    },
    modules: {
        catagtory,
        newlist
    }
})
export default store
