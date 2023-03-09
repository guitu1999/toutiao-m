<template>
  <div id="app">
    <!-- 导航组件 -->
    <CataGtory></CataGtory>
    <NewList></NewList>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

  </div>
</template>

<script>
import CataGtory from './components/catagtory.vue'
import NewList from './components/new-list.vue'

export default {
  components: {
    CataGtory,
    NewList
  }
}
</script>

<style scoped></style>