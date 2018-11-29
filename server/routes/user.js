const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'k' && user.password === '123') {
    ctx.session.user = { // koa会写入cookie
      username: 'k'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'k'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password err'
    }
  }
})

module.exports = userRouter
