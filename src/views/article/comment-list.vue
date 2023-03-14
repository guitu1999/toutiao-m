<template>
    <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <CommentItem @reply-click="$emit('reply-click', $event)" :error.sync="error" v-for="(item, index) in list"
            :key="index" :obj="item" />
    </van-list>
</template>
  
<script>
import { commentListApi } from '@/api/index.js'
import CommentItem from './comment-item.vue'
export default {
    name: "CommentList",
    components: {
        CommentItem
    },
    props: {
        source: {
            type: [String, Number, Object],
            required: true
        },
        list: {
            type: Array,
            default: function () {
                return []
            }
        },
        type: {
            type: String,
            default: 'a',
            validator(value) {
                return ['a', 'c'].includes(value)  //校验
            }
        }
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,//获取下一页数据的标记
            limit: 10,
            error: false,//加载失败
        };
    },
    computed: {},
    watch: {},
    created() {
        //手动初始onload  不会自动开启初始loading
        //手动开启初始loading
        this.loading = true
        this.onLoad()
    },
    mounted() { },
    methods: {
        async onLoad() {
            try {
                //1.获取数据
                let { data } = await commentListApi({
                    type: this.type, //a 文章的评论  c评论的回复
                    source: this.source.toString(), //文章的评论 文章的id  回复的评论 品论的id
                    offset: this.offset,
                    limit: this.limit,
                })
                console.log('评论', data);
                this.list.push(...data.data.results)

                //传递给父组件评论数量
                this.$emit('changeConent', data.data.total_count)
                this.loading = false
                if (data.data.results.length) {
                    this.offset = data.data.last_id
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false

            }
        }
    }
};
</script>
  
<style scoped lang="less"></style>