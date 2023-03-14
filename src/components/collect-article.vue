<template>
    <van-button :loading="loading" @click="collectFn" :class="{ collect: value }"
        :icon="value ? 'star' : 'star-o'"></van-button>
</template>

<script>
import { delcollectArticleApi, collectArticleApi } from '@/api/index.js'
export default {
    props: {
        value: {
            type: Boolean,
            required: true
        },
        art_id: {
            type: [String, Number],
            required: true

        }
    },
    data() {
        return {
            loading: false,//加载loading
        }
    },
    methods: {
        //收藏按钮
        async collectFn() {
            console.log('点击了收藏');
            this.loading = true
            try {
                //收藏
                if (!this.value) {
                    await collectArticleApi(this.art_id)
                } else {
                    //取消收藏
                    await delcollectArticleApi(this.art_id)
                }
                //更新父组件的收藏状态
                this.$emit('input', !this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
            } catch (err) {
                console.log('错误', err);
            }

            this.loading = false

        }
    }
}
</script>

<style scoped lang="less">
.collect {
    .van-icon {
        color: #ffa500
    }
}
</style>