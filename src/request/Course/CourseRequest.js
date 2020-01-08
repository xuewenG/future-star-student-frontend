import uniRequest from 'uni-request'
import STATE from '@/request/constant'

function toChineseTimeString (date) {
  return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDay() + '日'
}

export default {
  async getOngoingClassList (id) {
    console.log('getOngoingClassList')
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === '2000') {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          if (item.state === STATE.ACTIVITY.UNDERWAY) {
            list.push({
              id: item.id,
              name: item.name,
              img: '/static/EdStarsLogo.png',
              intro: '',
              url: '/pages/Course/OngoingCourse'
            })
          }
        }
        return list
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async getAuditingClassList (id) {
    console.log('getAuditingClassList')
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === '2000') {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          if (item.state === STATE.ACTIVITY.BEFORE) {
            list.push({
              id: item.id,
              name: item.name,
              img: '/static/EdStarsLogo.png',
              intro: '',
              url: '/pages/Course/AuditingCourse'
            })
          }
        }
        return list
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async getFinishedClassList (id) {
    console.log('getFinishedClassList')
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === '2000') {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          if (item.state === STATE.ACTIVITY.CLOSED) {
            list.push({
              id: item.id,
              name: item.name,
              img: '/static/EdStarsLogo.png',
              intro: '',
              url: '/pages/Course/FinishedCourse'
            })
          }
        }
        return list
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async getCourseList (clazz_id) {
    console.log('getCourseList')
    try {
      const resp = await uniRequest.get('/course/course?page=1&page_size=999&clazz_id=' + clazz_id)
      if (resp.data.code === '2000') {
        const infoItem = {}
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          console.log(item)
        }
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
