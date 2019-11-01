const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: true,

  devServer: {
    port: 8099, // 端口号
    host: "localhost", // 'localhost'
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    clientLogLevel: "warning", // 浏览器eslint提示
    // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "<url>",
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack: config => {
    // 使用svg-sprite-loader导入svg
    config.module.rule("svg").uses.clear();
    config.module
      .rule("svg1")
      .test(/\.svg$/)
      .use("svg-sprite")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
      .include.add(resolve("src/icons"))
      .end();
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/index.less")] // 全局引入less
    }
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5, // 换算的基数
            propList: ["*"] // 需要做转化处理的属性
            // selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
          })
        ]
      }
    }
  }
};
