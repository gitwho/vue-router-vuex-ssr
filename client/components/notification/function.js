import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component) // 创建组件

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return // 服务端无法进行dom操作，要判断

  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest // 剩下的键值对
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }

  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() // 生成$el对象
  document.body.appendChild(instance.vm.$el)

  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => { // 销毁提示框
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除dom节点
    instance.vm.$destroy() // 删除vm对象
  })

  instance.vm.$on('close', () => { // 页面上显示消失
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
