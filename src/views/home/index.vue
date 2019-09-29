<template>
  <div class="home">
    <img src="../../assets/logo.png" /><br />
    {{ msg }}
    <svg-icon icon-class="earth" /><br /><br />

    <van-button disabled type="primary">禁用状态</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/test">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/test">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/test">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to Your Vue.js Frame",
      active: 0
    };
  },
  computed: {},

  mounted() {
    console.log(process.env);
  }
};
</script>

<style scoped lang="less">
.home {
  // .fs;
  height: 100%;
  background-color: #fff;
  img {
    width: 160px;
    height: 160px;
    margin: 100px 0 50px 0;
  }
}
</style>
