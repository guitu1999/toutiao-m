<template>
    <div>
        <van-nav-bar class="title" :title="nowComment.reply_count > 0 ? `${nowComment.reply_count}条回复` : '暂无回复'">
            <van-icon @click="$emit('close')" slot="left" name="cross"></van-icon>
        </van-nav-bar>
        <div class="scroll_box">
            <!-- 当前评论 -->
            <CommentItem :obj="nowComment"></CommentItem>
            <van-cell title="全部回复"></van-cell>
            <!-- 评论的回复列表 -->
            <commentList :list="list" :source='nowComment.com_id' type="c"></commentList>
        </div>

        <!-- 发布评论 -->
        <div class="post-wrap">
            <van-button @click="showBottom = true" class="btn" size="small" round>发布</van-button>
        </div>
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '20%' }">
            <commentPost @post-success="post_success" :target="nowComment.com_id" :art_id="nowComment.aut_id"></commentPost>
        </van-popup>
    </div>
</template>

<script>
import CommentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import commentPost from '@/components/comment-post.vue';
export default {
    components: {
        CommentItem,
        commentList,
        commentPost
    },
    props: {
        nowComment: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            showBottom: false,
            list: []
        }
    },
    created() {
        console.log('回复的', this.nowComment);
    },
    methods: {
        //发布成功
        post_success(data) {
            console.log('回复发布成功', data);
            //关闭弹层
            this.showBottom = false
            this.list.unshift(data.new_obj)
            this.nowComment.reply_count++
        }
    }
}
</script>

<style scoped lang="less">
/deep/.title .van-nav-bar__title {
    color: #000 !important;
}

.post-wrap {
    height: 88px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;

    .btn {
        width: 60%;
    }
}

.scroll_box {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    overflow-y: auto;
    bottom: 88px;
}
</style>