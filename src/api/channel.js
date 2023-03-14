//频道请求模块
import request from '../utils/request.js'

//获取我的用户频道列表
export const Mychannel = () => request({
    method: "GET",
    url: '/v1_0/user/channels'
})
//修改用户频道
export const addChannel = (channels) => request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
        channels: [channels]
    }
})
//删除指定频道 
export const delChannel = (id) => request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`,

})