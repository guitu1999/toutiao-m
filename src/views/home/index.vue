<template>
    <div class="home">

        <!-- 头部搜索框 -->
        <TopBar></TopBar>
        <!-- 占位 -->
        <div class="box">

        </div>
        <!-- 频道列表 -->
        <van-tabs sticky class="tabs" title-active-color="" v-model:active="active" :animated="true" swipeable>
            <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
                <!-- 文章列表   -->
                <ArticleList :channels="obj"></ArticleList>
            </van-tab>
            <!-- 占位符 -->
            <div slot="nav-right" class="zhan_box"></div>
            <div slot="nav-right" @click="is_proup_show = true" class="more_box">
                <i class="iconfont icon-gengduo"></i>
            </div>
        </van-tabs>
        <!-- 频道编辑弹出层 -->
        <van-popup round v-model:show="is_proup_show" close-icon-position="top-left" closeable position="bottom"
            :style="{ height: '90%' }">
            <ChannelEdit @changeIndex="changeIndex" :channels="channels" :channel_index="active"></ChannelEdit>
        </van-popup>
    </div>
</template>

<script>
//导航搜索模块
import TopBar from '../../components/topbar.vue'
//文章列表组件
import ArticleList from './component/article-list.vue'
//引入文章频道编辑页面
import ChannelEdit from './component/channel-edit.vue'

//引入我的频道
import { MychannelApi } from '../../api/index.js'
//登录
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
    components: {
        TopBar,
        ArticleList,
        ChannelEdit
    },
    data() {
        return {
            active: 0,//控制被激活的标签
            channels: [],//频道列表,
            is_proup_show: false,//弹出层的显示状态
        }
    },
    created() {

        this.loadChannel()
    },
    //计算属性
    computed: {
        ...mapState(['user']),
    },
    methods: {
        //加载频道列表
        async loadChannel() {
            try {
                if (this.user) {
                    //已登录获取用户频道列表
                    const { data } = await MychannelApi()
                    this.channels = data.data.channels
                    console.log('频道列表请求成功', data);
                } else {
                    //未登录 判断是否有本地的频道列表(有直接使用 没有获取默认)
                    const localList = getItem('TOUTIAO_CHANNELS')
                    if (localList) {
                        this.channels = localList
                    } else {
                        //不登陆
                        const { data } = await MychannelApi()
                        this.channels = data.data.channels
                    }
                }


            } catch (err) {
                console.log('失败', err);
            }
        },
        //改变频道索引
        changeIndex(i, is_edit = false) {
            this.active = i
            if (!is_edit) {
                //关闭弹窗
                this.is_proup_show = false
            }

        }
    }
}
</script>

<style >
.home {
    padding-bottom: 100px;
    padding-top: 50px;
}

.tabs .van-tab {
    border: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
}

.tabs .van-tabs__wrap {
    height: 82px;
    /* position: fixed;
    top: 92px;
    z-index: 999; */
}

.tabs .van-tabs__line {
    width: 50px !important;
    height: 6px;
    background-color: #3296fa;
}

.more_box {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;


}

.more_box:before {
    content: '';
    position: absolute;
    left: 0;
    width: 2px;
    height: 100%;
    background-image: url(../../assets/gradient-gray-line.png);
}

.more_box i {
    font-size: 32px;
}

.zhan_box {
    /* 不参与剩余空间计算 固定宽度 */
    flex-shrink: 0;
    width: 66px;
    height: 82px;
}

.box {
    height: 20px;
}
</style>