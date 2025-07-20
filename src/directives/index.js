import lazy from './modules/lazy'

/**
 * 全局指令注册
 */
export default {
  install(app) {
    // https://cn.vitejs.dev/guide/features.html#glob-import
    // import.meta.glob 中第二个参数 { eager: true } 为同步导入
    const directives = import.meta.glob('./modules/*.js', { eager: true })

    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的 name
      const keyArr = key.split('/')
      const name = keyArr[keyArr.length - 1].replace('.js', '')

      // 完成注册
      app.directive(name, value.default)
    }
  }
}
