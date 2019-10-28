vue 组件生成 静态html的webpack配置步骤：

1. 全局安装prerender-spa-plugin，只安装一次
   npm i -g prerender-spa-plugin
2.  给prerender-spa-plugin，
    @prerenderer/renderer-puppeteer，
    @prerenderer/prerenderer，
     html-minifier 创建符号链接

 npm link prerender-spa-plugin
 npm link html-minifier
 npm link @prerenderer/renderer-puppeteer
 npm link @prerenderer/prerenderer

3. 安装本地依赖
  npm install
4. 构建命令
   npm run dev  开发环境（热加载机制）
   npm run static 生成静态文件
   npm run prod 一般的生产环境构建

