# 简介

> 根据vue脚手架修改增强开发效率,启动dev-server提供热更新的同时，会附带启动一个express服务器api的mock功能(同时也具备代理真实api服务器的功能)。
> 使用vue构建了 h5单页应用，适合Hybrid APP使用

# 本地mock相关
>  http将拦截url中带 /mule/app 的请求作为api入口转交给 ./server/apimock/index.js 处理
>  要更换api地址/mule/app, 需在 ./build/dev-server.js 中92行配置

# 配置代理远程api服务器
>./config/index.js 中配置代理api服务器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
