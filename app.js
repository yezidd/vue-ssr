const express = require('express')
const fs = require('fs')
const path = require('path')
const {
  createBundleRenderer,
  createRenderer
} = require('vue-server-renderer')

const devServer = require('./build/dev-server');
const isProduction = process.env.NODE_ENV === 'production'
const app = express()
const resolve = file => path.resolve(__dirname, file);

let renderer;

if (isProduction) {
  console.log("-----production----")
  // 生成服务端渲染函数
  renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: fs.readFileSync(resolve("./index.tpl.html"), 'UTF-8'),
    clientManifest: require('./dist/vue-ssr-client-manifest')
  });
} else {
  renderer = devServer(app, {
    update: (bundle, clientManifest) => {
      renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(resolve("./index.tpl.html"), 'UTF-8'),
        clientManifest: clientManifest
      });
    }
  })
}


// 引入静态资源
app.use(express.static(path.join(__dirname, 'dist')))
// 分发路由


app.get('*', (req, res) => {
  const context = {url: req.url}

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})

app.on('error', err => console.log(err))
app.listen(3000, () => {
  console.log(`vue ssr started at localhost:3000`)
})