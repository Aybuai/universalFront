import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 添加 icode
//     config.headers.icode = ''
//     // 必须返回 config
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default service
