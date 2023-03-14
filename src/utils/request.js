//引入 axios
import axios from 'axios'

//拿到vuex中token
import store from '@/store/index.js'

import JSONBig from 'json-bigint'

//JSONBig 可以处理数据中超出js安全数据整数范围的问题
let Jsonstr = `{"art_id":1245953273786007552}`
console.log('原始', JSON.parse(Jsonstr)); //1245953273786007600
//使用的时候  需要把JSONBig.parse(Jsonstr) 转成字符串
console.log('jsonbig', JSONBig.parse(Jsonstr).art_id.toString()); //1245953273786007552

//封装基础的地址
axios.defaults.baseURL = 'http://toutiao.itheima.net'
//请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器');
    // 在发送请求之前做些什么
    //config本次请求的请求配置对象(包括请求地址 请求头)
    console.log('config', config);
    console.log('444', store.state);
    //已经登录并且存在token
    if (store.state && store.state.user && store.state.user.token) {
        console.log('555');
        //加入到请求头
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    console.log('666');
    //一定要返回config   否则请求停在这里 出不去
    return config;
}, function (error) {
    // 对请求错误做些(还没有发出请求)
    return Promise.reject(error);
});


export default axios