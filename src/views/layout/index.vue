<template>
    <div>
        <!-- 路由挂载点 -->
        <router-view>

        </router-view>
        <!-- 导航栏 -->
        <van-tabbar class="tabbar" v-model="active" router>
            <van-tabbar-item to="/">
                <i slot="icon" class="iconfont icon-shouye"></i>
                首页
            </van-tabbar-item>
            <van-tabbar-item to="/question">
                <i slot="icon" class="iconfont icon-wenda"></i>
                问答
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="iconfont icon-shipin"></i>
                视频
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="iconfont icon-wode"></i>
                {{ user ? '我的' : '未登录' }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            active: ''
        }
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style scoped>
.tabbar .iconfont {
    font-size: 40px;
}
</style>