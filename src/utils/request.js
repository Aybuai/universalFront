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

// 响应拦截器
// 接口请求返回后，.then 之前
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data

  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  }
  // TODO：业务错误
  return Promise.reject(new Error(message))
})

export default service
