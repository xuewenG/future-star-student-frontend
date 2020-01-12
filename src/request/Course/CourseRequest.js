import uniRequest from 'uni-request'
import STATE from '@/request/constant'
import { toChineseTimeString } from '@/request/util'

export default {
  async getOngoingClassList (id) {
    console.log('getOngoingClassList')
    try {
      const resp = await uniRequest.get('/clazz/student?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i].clazz
          console.log(item)
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
        console.log('OngoingClassList', list)
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
      const resp = await uniRequest.get('/clazz/student?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i].clazz
          if (item.state === STATE.ACTIVITY.BEFORE) {
            list.push({
              id: item.id,
              name: item.name,
              img: '/static/EdStarsLogo.png',
              intro: '',
              url: '/pages/Course/AuditingCourse',
              auditingState: resp.data.data.results[i].state
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
      const resp = await uniRequest.get('/clazz/student?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        let list = []
        list = []// make a direct use of list in order to pass eslint
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i].clazz
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

  async getCourseList (clazzId, type) {
    console.log('getCourseList')
    try {
      const resp = await uniRequest.get('/course/course?page=1&page_size=999&clazz_id=' + clazzId)
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        // console.log(resp.data.data.results)
        const list = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          list.push({
            id: item.id,
            name: item.name,
            img: '/static/EdStarsLogo.png',
            intro: item.introduction,
            url: '/pages/Course/' + type,
            data: {
              id: item.id,
              time: toChineseTimeString(new Date(item.begin_time)) + '-' + toChineseTimeString(new Date(item.end_time)),
              location: item.location,
              introduction: item.introduction,
              clazz_id: item.clazz,
              image: item.image,
              teacher: {
                name: item.teacher.name,
                avatar: item.teacher.avatar,
                title: item.teacher.title,
                contact: item.teacher.contact_way
              }
            }
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
