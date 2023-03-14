<template>
    <van-cell class="comment-item">
        <van-image slot="icon" class="avatar" round fit="cover" :src="obj.aut_photo" />
        <div slot="title" class="title-wrap">
            <div class="user-name">{{ obj.aut_name }}</div>
            <van-button @click="likeBtn" :class="{ like: obj.is_liking }" class="like-btn" :loading="loading"
                :icon="obj.is_liking ? 'good-job' : 'good-job-o'">{{
                    obj.like_count || '赞'
                }}</van-button>
        </div>

        <div slot="label">
            <p class="comment-content">{{ obj.content }}</p>
            <div class="bottom-info">
                <span class="comment-pubdate">{{ obj.pubdate | relativeTime }}</span>
                <van-button @click="$emit('reply-click', obj)" class="reply-btn" round>回复 {{ obj.reply_count }}</van-button>
            </div>
        </div>
    </van-cell>
</template>
  
<script>
import { delcommentLikeApi, commentLikeApi } from '@/api/index.js'
export default {
    name: 'CommentItem',
    components: {},
    props: {
        obj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: false,//加载状态
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        //点赞
        async likeBtn() {
            this.loading = true
            try {
                //取消点赞
                if (this.obj.is_liking) {
                    await delcommentLikeApi(this.obj.com_id)
                    this.obj.like_count--

                } else {
                    //点赞
                    await commentLikeApi(this.obj.com_id)
                    this.obj.like_count++
                }
                this.obj.is_liking = !this.obj.is_liking
            } catch (err) {

            }
            this.loading = false

        }
    }
}
</script>
  
<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }

    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-name {
            color: #406599;
            font-size: 26px;
        }
    }

    .comment-content {
        font-size: 32px;
        color: #222222;
        word-break: break-all;
        text-align: justify;
    }

    .comment-pubdate {
        font-size: 19px;
        color: #222;
        margin-right: 25px;
    }

    .bottom-info {
        display: flex;
        align-items: center;
    }

    .reply-btn {
        width: 135px;
        height: 48px;
        line-height: 48px;
        font-size: 21px;
        color: #222;
    }

    .like-btn {
        height: 30px;
        padding: 0;
        border: none;
        font-size: 19px;
        line-height: 30px;
        margin-right: 7px;

        .van-icon {
            font-size: 30px;
        }

        &.like {
            color: #e5645f
        }
    }
}
</style>