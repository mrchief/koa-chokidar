# koa-chokidar

koa middleware to watch and reload files on change. Makes nodemon unnecessary.

[![NPM version][npm-image]][npm-url] [![gzip][gzip-image]][gzip-url]

[![build status][travis-image]][travis-url]

[npm-image]: http://img.shields.io/npm/v/koa-chokidar.svg?style=flat-square
[npm-url]: http://npmjs.org/package/koa-chokidar
[travis-image]: https://img.shields.io/travis/mrchief/koa-chokidar.svg?style=flat-square
[travis-url]: https://travis-ci.org/mrchief/koa-chokidar
[gzip-image]: http://img.badgesize.io/https://unpkg.com/koa-chokidar/src/index.js?compression=gzip&style=flat-square
[gzip-url]: https://unpkg.com/koa-chokidar/src/index.js

## Why

Inspired by [Don't use nodemon, there are better ways!](https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e) and [connect-chokidar](https://github.com/nemtsov/connect-chokidar), this module alleviates the pain of waiting for webpack (or your favorite bundler) to compile, anytime a hot-reloaded file changes on disk, for Koa apps.

## Install

```
> npm i koa-chokidar

// or if using yarn

> yarn add koa-chokidar
```

## Usage

```
const createWatcher = require('koa-chokidar')

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

// ...

const router = require('koa-router')()

// You'll have to `require()` all of the files that your
// local middleware or router depend on. This is because if we required it on top,
// the router / middleware would always refer to that instance and there would be
// no way of clearing it.
router.get('/', koaChokidar(() => require('./src/homepage')))
router.get('/users', koaChokidar(() => require('./src/user-api')))
```

## Example

Checkout the example folder for a sample `koa` app. You can run the example app by:

```
$ git clone https://github.com/mrchief/koa-chokidar
$ cd koa-chokidar/example
$ npm install
$ npm start
```

Visit `http://localhost:8000` in any browser. Then try changing the response in any of the watched files and hit refresh on the browser. Watch the response change without restarting the node process!

The sample app uses `koa-router` but you can use any other router/middleware. The idea remains the same - load your watched files via `koa-chokidar`. Anything required/imported outside of `koa-chokidar` will not be watched/reloaded.

## Debugging

Run your process with the `NODE_DEBUG=koa-chokidar` environment variable set.

## License

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

Released 2018 by [Hrusikesh Panda](https://github.com/mrchief)
