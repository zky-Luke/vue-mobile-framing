# vue-mobile-framing

## Project setup
```
yarn | 	npm i
```

### Compiles and hot-reloads for development
```
yarn serve | num run dev
```

### Compiles and minifies for production
```
yarn build:prod | npm run build:prod
```

### Run your tests
```
yarn build:test | npm run build:test
```

### Lints and fixes files
```
yarn lint | npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Technology stack
1. 使用style-resources-loader全局注册less
2. 使用vuex
3. 路由使用懒加载功能（使用babel 的 plugins babel-plugin-dynamic-import-node。它只做一件事就是将所有的import()转化为require()）
4. 使用国际化vue-i18n
5. 优雅使用icons
6. 全局捕获错误、路由守卫
7. 安装amfe-flexible及postcss-pxtorem自适应
8. 添加测试testing、预生产presentation、生产production环境
9. axios二次封装
10. 页面切换动画animation
11. Web 存储storage封装
