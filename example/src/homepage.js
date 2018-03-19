module.exports = (ctx, next) => {
  ctx.body =
    "Hi! I'm now being watched. Try changing this text or *-api.js files and watch them being served fresh without restarting node process. Yay!"
}
