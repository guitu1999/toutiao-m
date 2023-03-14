// 评论模块
import request from '@/utils/request'
//获取文章评论别表
export const commentList = (params) => request({
    url: '/v1_0/comments',
    method: 'GET',
    params
})
//对评论点赞   /v1_0/comment/likings
export const commentLike = (target) => request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
        target
    }
})

//对评论取消点赞
export const delcommentLike = (target) => request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',

})

//发布评论
export const publishComment = (data) => request({
    url: '/v1_0/comments',
    method: 'POST',
    data
})