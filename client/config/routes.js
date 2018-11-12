import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // props: true, // 推荐 :id的值会通过Todo组件的props传进去
    // props: { // 指定 值 的写法
    //   id: '354'
    // },
    // props: (route) => ({ id: route.query.a }),
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'sdkf'
    }
    // children: [
    // {
    //   path: 'test',
    //   component: Login
    // }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
