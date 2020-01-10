import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async getSchoolmateList (url) {
    console.log('getSchoolmateList')
    try {
      const resp = await uniRequest.get('/student/student/letter' + url)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        console.log(resp.data)
        const schoolmateList = resp.data.data.results
        return schoolmateList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
