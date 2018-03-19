module.exports = (ctx, next) => {
  // assume we fecthed session data some how
  const response = {
    authenticated: true,
    token: 'someRandomEncryptedBlaBla'
  }
  ctx.body = response
}
