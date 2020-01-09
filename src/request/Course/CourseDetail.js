import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async getCourseItemList (id) {
    console.log('getCourseItemList')
    try {
      const resp = await uniRequest.get('/course/content?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {

      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
