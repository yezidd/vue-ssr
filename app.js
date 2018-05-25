const express = require('express')
const fs = require('fs')
const path = require('path')
const {
  createBundleRenderer,
  createRenderer
} = require('vue-server-renderer')

const app = express()
const resolve = file => path.resolve(__dirname, file);

// 生成服务端渲染函数
const bundle = createRenderer(require('./dist/vue-ssr-server-bundle.json'))

// 引入静态资源
app.use(express.static(path.join(__dirname, 'dist')))
// 分发路由


app.get('*', (req, res) => {
  const context = {url: req.url}
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  bundle.renderToString((err, html) => {
    // 处理异常……
    console.log(html, '---')
    res.end(html)
  })
})

app.on('error', err => console.log(err))
app.listen(3000, () => {
  console.log(`vue ssr started at localhost:3000`)
})