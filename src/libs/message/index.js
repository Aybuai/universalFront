import { h, render } from 'vue'
import messageComponent from './index.vue'

/**
 * message 函数
 * @param {*} type success | warn | error 类别
 * @param {*} content 内容
 * @param {*} duration 延迟关闭时间，默认 3000 毫秒
 */
export const message = (type, content, duration = 3000) => {
  /**
   * 动画结束时的回调
   */
  const onDestroy = () => {
    // 3. 销毁
    render(null, document.body)
  }
  // 1. 生成 vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 2. render
  render(vnode, document.body)
}
