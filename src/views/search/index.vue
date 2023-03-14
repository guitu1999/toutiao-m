<template>
    <div>
        <!-- 搜索 -->
        <form action="/" class="formbox">
            <van-search background="#3296fa" v-model="search_text" show-action placeholder="请输入搜索关键词" @search="onSearch"
                @cancel="onCancel" @focus="focus" />
        </form>
        <!-- 占位 -->
        <div class="zhanwei"></div>
        <!-- 搜索结果 -->
        <SearchResult :search_text="search_text" v-if="is_result_show"></SearchResult>
        <!-- 联想记录 -->
        <SearchSuggest @search="onSearch" :search_val="search_text" v-else-if="search_text"></SearchSuggest>
        <!-- 搜索历史记录 -->
        <SearchHistory @search="onSearch" @allDelHis="allDelHis" :searchList="searchList" v-else></SearchHistory>


    </div>
</template>

<script>
import SearchHistory from './component/searchHisory.vue'
import SearchResult from './component/searchResult.vue'
import SearchSuggest from './component/searchSuggest.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
    components: {
        SearchHistory,
        SearchResult,
        SearchSuggest
    },
    data() {
        return {
            search_text: '',//搜索的文本
            is_result_show: false,//控制搜索结果的展示
            searchList: getItem('TOUTIAO_HISTORY') || [],//搜索历史

        }
    },
    watch: {
        searchList: {
            deep: true,
            handler(newvalue) {
                console.log('搜索更变了8888');
                setItem('TOUTIAO_HISTORY', newvalue)
            }
        }
    },
    methods: {
        //搜索
        onSearch(val) {
            console.log('val', val);
            this.search_text = val
            this.is_result_show = true
            //历史记录  不要重复  最新的排到最前边
            let index = this.searchList.indexOf(val)
            if (index != -1) {
                this.searchList.splice(index, 1)
            }
            this.searchList.unshift(val)
        },
        //关闭搜索
        onCancel() {
            this.$router.back()
        },
        //获得焦点
        focus() {
            console.log('获得焦点');
            this.is_result_show = false

        },
        //删除搜索历史数组
        allDelHis() {
            this.searchList = []
        }
    }
}
</script>

<style scoped>
/deep/.van-search__action {
    color: #fff;
}

.formbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.zhanwei {
    height: 108px;
}
</style>