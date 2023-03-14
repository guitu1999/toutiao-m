<template>
    <div class="article-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.back()" title="黑马头条"></van-nav-bar>
        <!-- /导航栏 -->

        <div class="main-wrap">
            <!-- 加载中 -->
            <div class="loading-wrap" v-if="loading">
                <van-loading color="#3296fa" vertical>加载中</van-loading>
            </div>
            <!-- /加载中 -->

            <!-- 加载完成-文章详情 -->
            <div v-else-if="article.title" class="article-detail">
                <!-- 文章标题 -->
                <h1 class="article-title">{{ article.title }}</h1>
                <!-- /文章标题 -->

                <!-- 用户信息 -->
                <van-cell class="user-info" center :border="false">
                    <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
                    <div slot="title" class="user-name">{{ article.aut_name }}</div>
                    <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
                    <!-- 关注组件 -->
                    <FollowUser @changeStatus="article.is_followed = !article.is_followed" :aut_id="article.aut_id"
                        class="follow-btn" :is_followed="article.is_followed"></FollowUser>

                </van-cell>
                <!-- /用户信息 -->

                <!-- 文章内容 -->
                <div class="article-content markdown-body" ref="article-conent" v-html="article.content"></div>
                <van-divider>正文结束</van-divider>
                <!-- 评论组件 -->
                <CommentList @reply-click="ReplayClick" :list="CommentList" @changeConent="changeConent"
                    :source="article.art_id">

                </CommentList>
                <!-- 底部区域 -->
                <div class="article-bottom">
                    <van-button @click="showBottom = true" class="comment-btn" type="default" round size="small">写评论
                    </van-button>
                    <van-icon class="comment-icon" name="comment-o" :info="total_commentcount" />
                    <!-- 收藏组件 -->
                    <CollectArticle v-model="article.is_collected" :art_id="article.art_id" class="btn-item">

                    </CollectArticle>
                    <!-- <van-button class="btn-item" icon="star-o" /> -->
                    <!-- 点赞组件 -->
                    <GiveLike :art_id="article.art_id" v-model="article.attitude" class="btn-item"></GiveLike>
                    <!-- <van-button class="btn-item" icon="good-job-o" /> -->
                    <van-icon name="share" color="#777777"></van-icon>
                </div>
                <!-- /底部区域 -->
                <!-- 发布评论弹出 -->
                <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '20%' }">
                    <CommentPost @post-success="post_success" :target="article.art_id"></CommentPost>
                </van-popup>
            </div>
            <!-- /加载完成-文章详情 -->

            <!-- 加载失败：404 -->
            <div v-else-if="errStatus === 404" class="error-wrap">
                <van-icon name="failure" />
                <p class="text">该资源不存在或已删除！</p>
            </div>
            <!-- /加载失败：404 -->

            <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
            <div v-else class="error-wrap">
                <van-icon name="failure" />
                <p class="text">内容加载失败！</p>
                <van-button @click="loadInfo" class="retry-btn">点击重试</van-button>
            </div>
            <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
        </div>
        <!-- 评论回复 -->
        <!-- 弹层是懒渲染的   只有在第一次展示的时候才会渲染里面的内容 -->
        <van-popup v-model:show="replyshow" position="bottom" :style="{ height: '100%' }">
            <!-- 绑定v-if   条件渲染-->
            <CommentReply v-if="replyshow" @close="replyshow = false" :nowComment="nowComment"></CommentReply>
        </van-popup>
    </div>
</template>
  
<script>
import { articleInfoApi } from '@/api/index.js';
import { ImagePreview } from 'vant';
import FollowUser from '../../components/follow-user.vue'
import CollectArticle from '../../components/collect-article.vue'
import GiveLike from '../../components/give-like.vue'
import CommentList from './comment-list.vue'
import CommentPost from '../../components/comment-post.vue'
import CommentReply from './comment-reply.vue'
export default {
    name: 'ArticleIndex',
    components: {
        FollowUser,
        CollectArticle,
        GiveLike,
        CommentList,
        CommentPost,
        CommentReply
    },
    props: {
        articleid: {
            type: [Number, String],
            required: true
        }
    },
    //给所有的后代组件提供数据
    provide: function () {
        return {
            articleid: this.articleid
        }
    },
    data() {
        return {
            article: {},//文章详情
            loading: true,//加载中的loading状态
            errStatus: 0,//失败的状态码
            loadings: false,//关注loading状态
            total_commentcount: 0,//评论数量`
            showBottom: false,
            CommentList: [],//评论列表数组
            replyshow: false,//回复弹窗
            nowComment: {},//当前回复选中的评论
        }
    },
    computed: {},
    watch: {},
    created() {
        this.loadInfo()
    },
    mounted() { },
    methods: {
        //点击回复
        ReplayClick(obj) {
            console.log('点击了回复', obj);
            this.replyshow = true
            this.nowComment = obj
        },
        //发布评论成功
        post_success(data) {
            this.showBottom = false
            this.CommentList.unshift(data.new_obj)
        },
        //更新评论列表
        changeConent(num) {
            this.total_commentcount = num
        },
        //加载文章详情
        async loadInfo() {
            this.loading = true
            try {
                let { data } = await articleInfoApi(this.articleid)
                //模拟失败
                // if (Math.random() > 0.5) {
                //     console.log('失败了');
                //     JSON.parse('dhsjdhjshdjhk')
                // }
                console.log('data', data);
                //数据更新视图  不是立即执行
                this.article = data.data
                setTimeout(() => {
                    //初始化点击图片预览
                    console.log('图片预览', this.$refs['article-conent']);
                    this.previewImg()
                }, 0)

            } catch (err) {
                console.log('请求失败');
                if (err.response && err.response.status === 404) {
                    this.errStatus = 404
                }
            }
            this.loading = false

        },
        //预览图片
        previewImg() {
            // 得到所有的img节点
            let articleContent = this.$refs['article-conent']
            let imgs = articleContent.querySelectorAll('img')

            let imgurls = []
            imgs.forEach((img, index) => {
                imgurls.push(img.src)
                //注册点击事件
                img.onclick = () => {
                    ImagePreview({
                        images: imgurls,
                        onClose() {

                        },
                        startPosition: index
                    });
                }
            })
            console.log('图片数组', imgurls);

        },
        // //关注  取消关注
        // async followFn() {
        //     this.loadings = true
        //     try {
        //         //关注
        //         if (!this.article.is_followed) {
        //             await followUserApi(this.article.aut_id)
        //         } else {
        //             //取消关注
        //             await delfollowUserApi(this.article.aut_id)
        //         }
        //         this.article.is_followed = !this.article.is_followed

        //     } catch (err) {
        //         console.log('err', err);
        //         if (err.response && err.response.status === 400) {
        //             this.$toast(err.response.data.message)
        //         }
        //     }
        //     this.loadings = false

        // }
    }
}
</script>
  
<style scoped lang="less">
@import "./markdown.css";

.article-container {
    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
    }

    .article-detail {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        background-color: #fff;

        .article-title {
            font-size: 40px;
            padding: 50px 32px;
            margin: 0;
            color: #3a3a3a;
        }

        .user-info {
            padding: 0 32px;

            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }

            .van-cell__label {
                margin-top: 0;
            }

            .user-name {
                font-size: 24px;
                color: #3a3a3a;
            }

            .publish-date {
                font-size: 23px;
                color: #b7b7b7;
            }

            .follow-btn {
                width: 170px;
                height: 58px;
            }
        }

        .article-content {
            padding: 55px 32px;

            /deep/ p {
                text-align: justify;
            }
        }
    }

    .loading-wrap {
        padding: 200px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }

        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }

        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }

    .article-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;

        .comment-btn {
            width: 282px;
            height: 46px;
            border: 2px solid #eeeeee;
            font-size: 30px;
            line-height: 46px;
            color: #a7a7a7;
        }

        /deep/ .van-icon {
            font-size: 40px;
        }

        .comment-icon {
            top: 2px;
            color: #777;

            .van-info {
                font-size: 16px;
                background-color: #e22829;
            }
        }

        .btn-item {
            border: none;
            padding: 0;
            height: 40px;
            line-height: 40px;
            color: #777777;
        }

        .collect-btn--collected {
            color: #ffa500;
        }

        .like-btn--liked {
            color: #e5645f;
        }
    }
}
</style>
  