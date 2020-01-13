import uniRequest from 'uni-request'
import STATE from '@/request/constant'
export default {
  async login (data) {
    console.log('login')
    try {
      const response = await uniRequest.post('/student/login', data)
      console.log(response)
      uni.hideLoading()
      if (response.data.code === STATE.REQUEST.SUCCESS) {
        uni.reLaunch({
          url: '/pages/index',
          fail: (res) => {
            console.log('进入小程序失败')
            console.log(res)
          },
          success: (res) => {
            console.log('进入小程序成功')
            console.log(res)
            uni.clearStorage()
            uni.setStorageSync('student_id', response.data.data.student.id)
            uni.setStorageSync('student_id', 1)
          }
        })
      } else {
        uni.showToast({
          title: '登录失败,请重新登录',
          icon: 'none'
        })
      }
    } catch (error) {
      uni.showToast({
        title: '网络错误',
        icon: 'none'
      })
      console.error(error)
    }
  }
}
