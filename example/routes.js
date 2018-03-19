const router = require('koa-router')()
const createWatcher = require('../src')

const koaChokidar = createWatcher(`${__dirname}`, {
  // Unless specified explictly, `process.env.NODE_ENV !== 'production'` will be used as the default
  // so in production mode, this middleware will do nothing (to override, set it to `true`)
  watch: process.env.NODE_ENV !== 'production',

  // Only the filenames that are in the regexp below will be deleted
  // from `require.cache` when files change
  requireCacheToRemoveRe: /[/\\]src[/\\]/,

  // `chokidar` opts can be provided here
  chokidar: {
    ignored: ['node_modules']
  }
})

router.get('/', koaChokidar(() => require('./src/homepage')))
router.get('/users', koaChokidar(() => require('./src/user-api')))
router.get('/sessions', koaChokidar(() => require('./src/session-api')))

module.exports = router
