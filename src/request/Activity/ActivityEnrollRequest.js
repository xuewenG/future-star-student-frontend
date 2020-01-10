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
  }
}