import request from '@/utils/request.js'
//搜索建议
export const searchSug = (q) => request({
    url: '/v1_0/suggestion',
    method: "GET",
    params: {
        q: q
    }
})
//获取搜索结果
export const searchRes = (params) => request({
    url: '/v1_0/search',
    method: "GET",
    params
})

