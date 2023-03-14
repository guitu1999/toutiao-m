<template>
    <div>
        <van-cell @click="toInfo(obj)" v-for="obj in sugList" icon="search">
            <div slot="title" v-html="heightLight(obj)"></div>
        </van-cell>

    </div>
</template>

<script>
import { searchSugApi } from '@/api/index.js'
export default {
    props: {
        search_val: {
            type: String,
            required: true
        }
    },
    watch: {
        //搜索文本发生变化
        search_val: {
            handler(value) {
                console.log('123', value);
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.loadSearch(value)
                }, 200);

            },
            immediate: true
        }
    },
    data() {
        return {
            sugList: [],//联想建议列表,
            timer: null,//搜索防抖

        }
    },
    methods: {

        //搜索联想建议
        async loadSearch(value) {
            console.log('搜索联想');
            try {

                const { data } = await searchSugApi(value)
                console.log('搜索联想', data);
                this.sugList = data.data.options

            } catch (err) {
                console.log(err);
            }
        },
        //高亮
        heightLight(str) {
            console.log('高亮');
            //正则表达式 的书写   //中间的内容都会当作匹配字符来使用
            //需要根据数据变量动态创建正则表达式  手动 new RegExp
            //正则构造函数  参数1 匹配模式字符串  根据字符串创建正则表达式
            //参数2   匹配模式  
            const reg = new RegExp(this.search_val, 'gi')
            return str.replace(reg, `<span class="lightBox" >${this.search_val}</span>`)
        },
        //跳转建议详情
        toInfo(str) {
            this.$emit('search', str)
        }
    }
}
</script>

<style scoped>
/deep/.lightBox {
    color: red
}
</style>