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
  },
  async getCampList () {
    try {
      const resp = await uniRequest.get('/semester/semester?page=1&page_size=999')
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        const results = resp.data.data.results
        let campList = []
        campList = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const camp = results[i]
          campList.push({
            title: camp.subject,
            value: camp.id
          })
        }
        return campList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
