//导入请求模块
import request from '@/utils/request.js'

//导入vuex
// import store from '@/store/index.js'

//登录方法
export const login = (data) => request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
})

//发送验证码
export const sendMsg = (mobile) => request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET',
})
//获取用户自己的信息
export const useInfo = () => request({
    url: '/v1_0/user/profile',
    method: 'GET',
    //发送请求头(固定写法)
    // headers: {
    //     //需要登录才可以访问  传递的token Bearer后面有个空格
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
})
//获取频道列表 /v1_0/user/channels
export const channels = () => request({
    url: '/v1_0/channels',
    method: 'GET'
})

//关注用户  
export const followUser = (target) => request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
        target
    }
})
//取消关注
export const delfollowUser = (target) => request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE',
})
//用户资料
export const userInfo = () => request({
    url: '/v1_0/user/profile',
    method: 'GET',
})
//编辑用户资料  
export const edituserInfo = (data) => request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
})
//更新用户照片资料  
export const editAvater = (data) => request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
})