import Vue from 'vue';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  data () {
    return {
      imagePreview: {}, // 图片预览框
    }
  },

  methods: {
    previewGoBack () {
      // 打开预览框后执行
      if (Object.keys(this.imagePreview).length !== 0) {
        this.imagePreviewSwitch(false)
      }
    },

    imagePreviewSwitch (bol, imageArr) {
      if (bol) {
        // 路由后退监听
        if (window.history && window.history.pushState) {
          history.pushState(null, null, document.URL);
          window.addEventListener('popstate', this.previewGoBack, false);
        }
        let _this = this
        this.imagePreview = ImagePreview({
          images: imageArr,
          onClose () {
            _this.$router.back()
            _this.imagePreview = {}
          }
        })
      } else {
        history.pushState(null, null, document.URL);
        this.imagePreview.close();
      }
    }
  }
}