import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import './styles/index.scss'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import mDirectives from './directives'
// 导入虚拟注册 svg-icons
import 'virtual:svg-icons-register'
import store from './store'
import useTheme from './utils/theme'

useREM()
// 初始化主题
useTheme()
createApp(App).use(mLibs).use(mDirectives).use(store).use(router).mount('#app')
