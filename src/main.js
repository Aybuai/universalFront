import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import './styles/index.scss'
import { useREM } from './utils/flexible'
import mLibs from './libs'
// 导入虚拟注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
createApp(App).use(mLibs).use(router).mount('#app')
