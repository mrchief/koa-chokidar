const { normalize } = require('path')
const { debuglog } = require('util')
const chokidar = require('chokidar')

const log = debuglog('koa-chokidar')

function noopMiddleware(ctx, next) {
  return next()
}

function enableMiddleware(opts) {
  return typeof opts.watch === 'boolean'
    ? opts.watch
    : process.env.NODE_ENV !== 'production'
}

module.exports = function createMiddlewareWatcher(rootPath, opts = {}) {
  if (!enableMiddleware(opts)) {
    log('in production mode or watch is set to false. Not watching %s')
    return createMiddleware => noopMiddleware()
  }

  log('watching %s', normalize(rootPath))
  const watcher = chokidar.watch(normalize(rootPath), opts.chokidar)

  watcher.on('ready', () => {
    watcher.on('change', changedFilePath => {
      log('changed: %s', changedFilePath)

      Object.keys(require.cache).forEach(key => {
        if (
          !opts.requireCacheToRemoveRe ||
          opts.requireCacheToRemoveRe.test(key)
        ) {
          log('delete from require.cache: %s', key)
          delete require.cache[key]
        }
      })
    })
  })

  return function middlewareWatcher(createMiddlware) {
    return function watchAndRoute(ctx, next) {
      return createMiddlware()(ctx, next)
    }
  }
}
