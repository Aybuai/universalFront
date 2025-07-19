import request from '@/utils/request'

/**
 * 获取图片数据列表
 */
export const getPexelsList = (params) => {
  return request({
    url: '/pexels/list',
    params
  })
}
