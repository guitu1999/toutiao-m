<template>
    <div class="box">
        <van-pull-refresh :success-text="success_text" v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:error="error" error-text="请求失败，点击重新加载" v-model:loading="loading" :finished="finished"
                finished-text="没有更多了" @load="onLoad">
                <ArticleItem v-for="obj in list" :obj="obj">

                </ArticleItem>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
//引入文章列表
import { articleApi } from '@/api/index.js'
//引入文章组件
import ArticleItem from '../../../components/article-item.vue'
export default {
    components: {
        ArticleItem
    },
    props: {
        channels: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: false,//控制加载中  效果
            list: [],//存储列表数据
            finished: false,   //控制数据是否加载完毕,
            time_stamp: '',//传递的事件戳
            error: false,//数据错误
            refreshing: false,//控制下拉刷新
            success_text: '刷新成功',//刷新成功提示文字
        }
    },
    methods: {
        //更新文章
        async onLoad() {
            console.log('触发了更新111');
            try {
                // 1.请求更新数据
                const { data } = await articleApi({
                    channel_id: this.channels.id,//频道id 
                    //第一页数据 当前最新事件戳 Date.now()
                    timestamp: this.time_stamp || Date.now(),//时间戳(请求数据的页码)
                })
                console.log('文章请求成功', data);
                //2.把数据push到数组中
                //数组的展开操作符
                this.list.push(...data.data.results)
                // 3.加载状态结束  设置加载状态为false
                this.loading = false
                // 4.判断数据全部加载完成  
                if (data.data.results.length) {
                    //更新获取下一页数据的时间戳
                    this.time_stamp = data.data.pre_timestamp
                } else {
                    //没有数据 把finished改为true
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        },
        //下拉刷新
        async onRefresh() {
            try {
                console.log('触发了下拉刷新');
                //请求获取数据
                // 1.请求更新数据
                const { data } = await articleApi({
                    channel_id: this.channels.id,//频道id 
                    //第一页数据 当前最新事件戳 Date.now()
                    timestamp: Date.now(),//时间戳(请求数据的页码)
                })
                console.log('文章请求成功', data);
                //2.把数据push到数组中
                //数组的展开操作符
                this.list.unshift(...data.data.results)
                // 3.加载状态结束  设置加载状态为false
                this.loading = false
                this.success_text = `刷新成功,更新了${data.data.results.length}条数据`
                //关闭下拉刷新的loading状态
                this.refreshing = false
            } catch (err) {
                this.loading = false
                this.success_text = '刷新失败'
            }
        }
    }
}
</script>

<style scoped>
.box {
    height: 79vh;
    overflow: auto;
}
</style>