<template>
  <div class="test">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.test {
  height: 100%;
  background: #fff;
  img {
    height: 200px;
  }
}
</style>
