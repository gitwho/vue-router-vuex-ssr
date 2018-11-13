// commit 方法只接受两个参数
export default {
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
}
