const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({prefix: '/public'}) // 处理 ‘/public’ 开头的路径

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
