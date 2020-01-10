import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async getCourseItemList (id) {
    console.log('getCourseItemList')
    try {
      const resp = await uniRequest.get('/course/content?page=1&page_size=999&course_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        console.log(resp.data.data)
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async getCourseClassmateList (id) {
    console.log('getCourseClassmateList')
    try {
      const resp = await uniRequest.get('/student/student?page=1&page_size=999&clazz_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          list.push({
            id: item.id,
            avatar: item.avatar_url,
            name: item.name,
            area: item.company.city,
            company: item.company.name,
            position: item.company.position,
            profession: item.profession
          })
        }
        return list
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
