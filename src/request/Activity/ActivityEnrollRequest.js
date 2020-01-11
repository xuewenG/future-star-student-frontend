import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async validateEnrollQualification (activityId) {
    console.log('validateEnrollQualification')
    try {
      const resp = await uniRequest.get('/activity/clazz?page=1&page_size=999&activity_id=' + activityId)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        console.log(resp.data.data)
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },
  
  async activityEnroll (studentId, activityId) {
    console.log('activityEnroll')
    try {
      const resp = await uniRequest.post('/activity/student', {
        activity_id: activityId,
        student_id: studentId
      })
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        console.log(resp.data.data)
        return {
          state: 'success',
          msg: '报名成功'
        }
      } else {
        console.error(resp.data.msg)
        return {
          state: 'fail',
          msg: resp.data.msg
        }
      }
    } catch (error) {
      console.error(error)
      return {
        state: 'fail',
        msg: '网络错误'
      }
    }
  }
}