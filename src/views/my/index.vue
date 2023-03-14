<template>
    <div>
        <!-- 未登录 -->
        <div v-if="!user" class="header not-login" @click="$router.push('/login')">
            <img src="../../assets/mobile.png" alt="">
            <span class="text">登录 / 注册</span>
        </div>
        <!-- 已登陆 -->
        <div v-else class="header user-info">
            <!-- 基础信息 -->
            <div class="info">
                <div class="left">
                    <van-image class="avater" round fit="cover" position="left" :src="userinfo.photo" />
                    <span>{{ userinfo.name }}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round to="/userinfo">编辑资料</van-button>
                </div>
            </div>
            <!-- 数据统计 -->
            <div class="count">
                <div class="count_item">
                    <span>10</span>
                    <span>头条</span>
                </div>
                <div class="count_item">
                    <span>10</span>
                    <span>关注</span>
                </div>

                <div class="count_item">
                    <span>10</span>
                    <span>粉丝</span>
                </div>
                <div class="count_item">
                    <span>10</span>
                    <span>获赞</span>
                </div>
            </div>
        </div>

        <!-- 收藏历史 -->
        <div class="grid">
            <van-grid clickable :column-num="2">
                <van-grid-item icon="home-o" text="收藏" to="/">
                    <i slot="icon" class="iconfont icon-shoucang"></i>
                </van-grid-item>
                <van-grid-item icon="search" text="历史" url="https://github.com">
                    <i slot="icon" class="iconfont icon-lishi"></i>

                </van-grid-item>
            </van-grid>
        </div>
        <div>
            <!-- 消息通知 小智同学 -->
            <van-cell title="消息通知" is-link />
            <van-cell title="小智同学" is-link />
            <van-cell clickable @click="outBtn" v-if="user" class="out_btn" title="退出登录" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { useInfoApi } from '@/api/index.js'
export default {
    //计算属性
    computed: {
        ...mapState(['user'])
    },
    created() {
        //如果登录了就请求用户信息
        if (this.user) {
            //加载用户信息
            this.loadUseInfo()
        }

    },
    data() {
        return {
            userinfo: {},//用户信息
        }
    },
    methods: {
        //退出登录
        outBtn() {
            //清除state中的user  和 本地存储中的
            //需要使用$dialog
            this.$dialog.confirm({
                title: '标题',
                message:
                    '确认退出码',
            })
                .then(() => {
                    //退出 清除本地存储 
                    this.$store.commit('setUser', null)

                })
                .catch(() => {
                    //取消
                });
        },
        //加载用户信息
        async loadUseInfo() {
            try {
                const { data } = await useInfoApi()
                console.log('用户信息', data);
                this.userinfo = data.data
            } catch (err) {
                console.log('获取用户信息失败', err);
            }
        }
    }
}
</script>

<style scoped>
.header {
    height: 361px;
    background-image: url(../../assets/banner.png);
    background-size: cover;
}

.not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.not-login img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
}

.text {
    font-size: 28px;
    color: #fff;
}

.user-info .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;

}

.user-info .info .left {
    display: flex;
    align-items: center;
}

.user-info .info .left span {
    font-size: 30px;
    color: #fff;
}

.user-info .info .avater {
    width: 132px;
    height: 132px;
    margin-right: 23px;
    border: 4px solid #fff;
}

.user-info .count {
    height: 130px;
    display: flex;

}

.user-info .count .count_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 36px;
}

.icon-shoucang {
    color: #eb5253;
    font-size: 45px;
}

.icon-lishi {
    color: #ff9d1d;
    font-size: 45px;
}

.grid {
    height: 141px;
}

.out_btn {
    margin-top: 20px;
    text-align: center;
    color: #eb5253;
}
</style>