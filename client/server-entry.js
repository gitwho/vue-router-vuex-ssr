import createApp from './create-app'

export default context => { // 接收的context是 server.render.js内的context： const appString = await renderer.renderToString(context)
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            store
          })
        }
      })).then(data => {
        // console.log(store.state)
        context.meta = app.$meta()
        resolve(app)
      })
    })
  })
}
