<template>
    <div>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell :error.sync="error" error-text="加载失败,请稍后重试" v-for="(item, index) in resultList" :key="item.art_id"
                :title="item.title" />
        </van-list>
    </div>
</template>

<script>
import { searchResApi } from '@/api/index.js'
export default {
    data() {
        return {
            loading: false,
            finished: false,
            page: 1,
            per_page: 10,
            resultList: [],
            error: false,//加载失败
        }
    },
    props: {
        search_text: {
            type: String,
            required: true
        }
    },
    methods: {
        async onLoad() {
            try {
                const { data } = await searchResApi({
                    page: this.page,
                    per_page: this.per_page,
                    q: this.search_text
                })
                const { results } = data.data
                console.log('result', results);
                this.resultList.push(...results)
                this.loading = false
                if (results.length) {
                    this.page++
                } else {

                    this.finished = true
                }
            } catch (err) {
                console.log('错误', err);
                this.error = false
                this.loading = false

                this.finished = true

            }
            //1.请求获取数据
            //2.数据添加到数组列表中
            //3.loading关闭
            //4.判断是否还有数据 有更新获取下一个数据  没有加载状态结束
        }
    }
}
</script>

<style scoped></style>