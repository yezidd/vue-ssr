/**
 * Created by yzdd on 2018/5/23.
 */
const fs = require("fs");
const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
let config = {
  entry: path.resolve(__dirname, "../src/app.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: '[name].[hash:8].js',
    chunkFilename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">,
            css: 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'stage-0'],
          plugins: ['syntax-dynamic-import']
        }
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    publicPath: "/",
    contentBase: "/",
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}

module.exports = config;