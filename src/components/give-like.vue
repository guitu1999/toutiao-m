<template>
    <van-button :class="{ liked: value == 1 }" @click="LikrFn" :loading="loading"
        :icon="value == 1 ? 'good-job' : 'good-job-o'" />
</template>

<script>
import { dellikeArticleApi, likeArticleApi } from '@/api/index.js'
export default {
    props: {
        value: {
            type: Number,
            required: true
        },
        art_id: {
            type: [String, Number],
            required: true

        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async LikrFn() {
            this.loading = true
            try {
                let status = -1
                //点赞
                if (this.value === -1) {
                    await likeArticleApi(this.art_id)
                    status = 1

                } else {
                    //取消点赞
                    await dellikeArticleApi(this.art_id)
                }
                //更新父组件的点赞状态
                this.$emit('input', status)
                this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
            } catch (err) {

            }
            this.loading = false

        }
    }
}
</script>

<style scoped lang="less">
.liked {
    .van-icon {
        color: #e5645f !important;
    }
}
</style>