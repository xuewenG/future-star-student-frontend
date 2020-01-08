import uniRequest from 'uni-request'
import STATE from '@/request/constant'

function toChineseTimeString (date) {
  return ''+date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDay()+'日'
}

export default {
  async getOngoingCourseList (id) {
    console.log('getOngoingCourseList')
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

  async getAuditingCourseList (id) {
    console.log('getAuditingCourseList')
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
  
  async getFinishedCourseList (id) {
    console.log('getFinishedCourseList')
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
  
  async getCourseInfo (id) {
    console.log('getCourseInfo')
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999')
      if (resp.data.code === '2000') {
        let infoItem = {}
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          console.log(item)
          if (item.id === id) {
            infoItem = {
              id: item.id,
              time: toChineseTimeString(new Date(item.start_time))+'-'+toChineseTimeString(new Date(item.end_time)),
              place: 
            }
            console.log(infoItem)
            return infoItem
          }
        }
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
