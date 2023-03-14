<template>
    <div class="comment-post">
        <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50"
            placeholder="请输入留言" show-word-limit />
        <van-button :disabled="!message.length" @click="publishFn" class='post-btn'>发布</van-button>
    </div>
</template>
  
<script>
import { publishCommentApi } from '@/api/index.js'
export default {
    name: 'CommentPost',
    components: {},
    props: {
        target: {
            type: [Number, String],
            required: true
        },

    },
    //inject 选项来接收
    inject: {
        articleid: {
            type: [Number, String],
            defalut: null
        }
    },
    data() {
        return {
            message: ''
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        //发布事件
        async publishFn() {
            console.log('打印文章id', this.articleid);
            this.$toast.loading({
                message: '发布中...',
                forbidClick: true,
                duration: 0,//如果为0 则持续展示
            });
            try {
                let { data } = await publishCommentApi({
                    target: this.target,//评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
                    content: this.message,
                    art_id: this.articleid
                })
                console.log('发布评论', data);
                this.message = ''
                this.$emit('post-success', data.data)
                this.$toast.success('发布成功')
            } catch (err) {

            }
        }
    }
}
</script>
  
<style scoped lang="less">
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;
        background: #fff;

        &::before {
            display: none;
        }
    }
}
</style>
  