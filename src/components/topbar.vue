<template>
    <div class="home-container">

        <van-nav-bar fixed title="标题" class="nav_bar">
            <van-field @click="to_search" style="max-width: 100%;" class="search-btn" input-align="center" slot="title"
                placeholder="搜索" />
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    methods: {
        //跳转搜索方法
        to_search() {
            this.$router.push({
                path: '/search'
            })
        }
    }
}
</script>

<style >
.home-container {
    /* width: 100%; */
    background-color: #3296fa;
    padding: 30px 0 10px;
}

.search-btn {
    width: 550px;
    height: 64px;
    background-color: #5babfb !important;
    border-radius: 2500px;
    /* font-size: 28px; */
    line-height: 64px;
    color: #fff !important;
}

.van-icon {
    font-size: 32px;
}

.nav_bar .van-nav-bar__content .van-nav-bar__title {
    max-width: 100%;
}

.van-cell {
    padding: 0;
}
</style>