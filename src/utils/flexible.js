import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

/**
 * 判断当前是否为移动设备，判断依据为屏幕的宽度是否大于指定值（1280）
 */
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 判断当前是否为移动设备  实际开发中以此为准
 */
// export const isMobileTerminal = computed(() => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//      navigator.userAgent
//   )
// })

// 因为 tailwind 的尺寸单位默认为 rem，这是为了适配各种型号的移动端，但是还没有设置 rem 的基准值
/**
 * 初始化 rem 基准值，最大为 40px
 */
export const useREM = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40

  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 获取 html 标签
    const html = document.querySelector('html')
    // 获取根元素 fontSize 标准，屏幕宽度 / 10。（以 Iphone 为例 Iphone 6 屏幕宽度为 375，则标准 fontSize 为 37.5）
    let fontSize = window.innerWidth / 10
    // 获取到的 fontSize 不允许超过我们定义的最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 定义根元素（html）fontSize 的大小 （rem）
    html.style.fontSize = fontSize + 'px'
  })
}
