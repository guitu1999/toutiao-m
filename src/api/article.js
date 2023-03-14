// 导入请求模块 
import request from '../utils/request.js'

//导出方法  文章请求 params用于拼接参数
export const article = (params) => request({
    url: '/v1_0/articles',
    method: 'GET',
    params
})
//文章详情方法
export const articleInfo = (article_id) => request({
    url: `/v1_0/articles/${article_id}`,
    method: 'GET',
})
//文章收藏  
export const collectArticle = (target) => request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
        target
    }
})
//取消收藏
export const delcollectArticle = (target) => request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
})
//文章点赞
export const likeArticle = (target) => request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
        target
    }
})
//取消点赞
export const dellikeArticle = (target) => request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE',
})