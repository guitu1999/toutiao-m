<template>
  <div id="app">
    <!-- 导航组件 -->
    <!-- <CataGtory></CataGtory>
    <NewList></NewList> -->


    <!-- 挂载路由点 -->
    <router-view></router-view>

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