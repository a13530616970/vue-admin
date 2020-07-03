const path = require('path');
module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    // assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    // webpack配置
    chainWebpack: (config) => {

    },
    configureWebpack: (config) => {

    },
    // css相关配置
    css: {
        // 启⽤用 CSS modules
        modules: false,
        // 是否使⽤用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    },
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/devApi': {
                target: 'http://www.web-jshtml.cn/vue_admin_api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/devApi': ''
                }
            }
        }
    },
    // 第三⽅方插件配置
    pluginOptions: {
        // ...
    }
}

