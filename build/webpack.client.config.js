/**
 * Created by yzdd on 2018/5/23.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const isProduction = process.env.NODE_ENV === 'production'

let config = merge(baseConfig, {
  entry: path.resolve(__dirname, "../src/client_entry.js"),
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  plugins: [


    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    // new CleanWebpackPlugin(
    //   './dist',　 //匹配删除的文件
    //   {
    //     root: path.resolve(__dirname, "../"),       　　　　　　　　　　//根目录
    //     verbose: true,        　　　　　　　　　　//开启在控制台输出信息
    //     dry: false        　　　　　　　　　　//启用删除文件
    //   }
    // )
  ]
})

if (isProduction) {
  config.plugins.push(new ExtractTextPlugin({
    filename: "css/[name].[contenthash:8].css",
    allChunks: true
  }));
  // 将依赖模块提取到 vendor chunk 以获得更好的缓存，是很常见的做法。
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // 一个模块被提取到 vendor chunk 时……
      return (
        // 如果它在 node_modules 中
        /node_modules/.test(module.context) &&
        // 如果 request 是一个 CSS 文件，则无需外置化提取
        !/\.css$/.test(module.request)
      )
    }
  }));
  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  }));

}
module.exports = config;