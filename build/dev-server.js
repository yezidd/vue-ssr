/**
 * Created by yzdd on 2018/5/29.
 */
const express = require('express')
const fs = require('fs')
const {
  createBundleRenderer,
  createRenderer
} = require('vue-server-renderer')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const isProduction = process.env.NODE_ENV === 'production'
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');
const resolve = file => path.resolve(__dirname, file);

module.exports = (app) => {
  //增加入口的hot-middleware链接
  clientConfig.entry = [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true",
    path.resolve(__dirname, "../src/client_entry.js")
  ];
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  const clientCompiler = webpack(clientConfig);
  console.log(clientCompiler, "----")
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));


  if (!isProduction) {
    const renderer = createBundleRenderer(require('../dist/vue-ssr-server-bundle.json'), {
      runInNewContext: false,
      template: fs.readFileSync(resolve("../index.tpl.html"), 'UTF-8'),
      clientManifest: require(path.join(clientConfig.output.path, 'vue-ssr-client-manifest'))
    });
    return renderer;
  }

}