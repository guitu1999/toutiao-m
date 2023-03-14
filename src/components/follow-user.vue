<template>
    <van-button v-if="!is_followed" :loading="loadings" type="info" color="#3296fa" round size="small" @click="followFn()"
        icon="plus">关注</van-button>
    <van-button :loading="loadings" @click="followFn()" v-else round size="small">已关注</van-button>
</template>

<script>
import { followUserApi, delfollowUserApi } from '@/api/index.js';

export default {
    props: {
        is_followed: {
            type: Boolean,
            required: true
        },
        aut_id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            loadings: false
        }
    },
    methods: {
        //关注  取消关注
        async followFn() {
            this.loadings = true
            try {
                //关注
                if (!this.is_followed) {
                    await followUserApi(this.aut_id)
                } else {
                    //取消关注
                    await delfollowUserApi(this.aut_id)
                }
                this.$emit('changeStatus')

            } catch (err) {
                console.log('err', err);
                if (err.response && err.response.status === 400) {
                    this.$toast(err.response.data.message)
                }
            }
            this.loadings = false

        }
    }
}
</script>

<style scoped></style>