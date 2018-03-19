const Koa = require('koa')
const router = require('./routes')

const app = new Koa()
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000, err => {
  if (err) console.error({ err }, 'Error starting the server')

  console.info(`==> Listening at http://localhost:8000`)
})
