//登录模块
import { login, sendMsg, useInfo, channels, followUser, delfollowUser, userInfo, edituserInfo, editAvater } from './user.js'
//文章模块
import { article, articleInfo, collectArticle, delcollectArticle, likeArticle, dellikeArticle } from './article.js'
//我的频道列表模块
import { Mychannel, addChannel, delChannel } from './channel.js'
//搜索模块
import { searchSug, searchRes } from './search.js'
//评论模块
import { commentList, delcommentLike, commentLike, publishComment } from './comment.js'
//导出登录接口请求
export const loginApi = login
//发送验证码
export const sendMsgApi = sendMsg
//用户信息
export const useInfoApi = useInfo
//频道全部列表
export const channelsApi = channels
//文章列表
export const articleApi = article
//我的频道列表
export const MychannelApi = Mychannel
//添加我的频道
export const addChannellApi = addChannel
//删除指定频道
export const delChannelApi = delChannel
//请求搜索联想
export const searchSugApi = searchSug
//请求搜索结果
export const searchResApi = searchRes
//请求文章详情 
export const articleInfoApi = articleInfo
//关注用户
export const followUserApi = followUser
//取消关注用户
export const delfollowUserApi = delfollowUser
//收藏文章
export const collectArticleApi = collectArticle
//取消收藏文章
export const delcollectArticleApi = delcollectArticle
//文章点赞
export const likeArticleApi = likeArticle
//取消文章点赞  
export const dellikeArticleApi = dellikeArticle

//获取评论列表 
export const commentListApi = commentList
//评论点赞
export const commentLikeApi = commentLike
//评论取消点赞
export const delcommentLikeApi = delcommentLike
//发布评论 
export const publishCommentApi = publishComment
//用户信息 
export const userInfoApi = userInfo
//编辑用户信息  
export const edituserInfoApi = edituserInfo
//更新头像  editAvater
export const editAvaterApi = editAvater




