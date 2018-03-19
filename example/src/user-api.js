module.exports = (ctx, next) => {
  // assume we fecthed user records some how
  const response = {
    employees: [{ name: 'John1' }, { name: 'Mary' }]
  }
  ctx.body = response
}
