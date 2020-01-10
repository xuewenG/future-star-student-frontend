import uniRequest from 'uni-request'
import { toChineseTimeString } from '@/request/util'

export default {
  async getCampList () {
    try {
      const resp = await uniRequest.get('/semester/semester?page=1&page_size=999')
      if (resp.data.code === '2000') {
        const results = resp.data.data.results
        let campList = []
        campList = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const camp = results[i]
          campList.push({
            id: camp.id,
            name: camp.subject,
            introduction: camp.introduction,
            state: camp.state,
            type: 'image',
            swiperImg: 'https://i.loli.net/2020/01/09/zkinxqPBwbtdvXQ.png',
            img: 'https://i.loli.net/2020/01/09/iEZpONujHL4Sc13.png',
            url: '/pages/Apply/CampInfo'
          })
        }
        return campList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async getCampInfo (campId) {
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999&semester_id=' + campId)
      if (resp.data.code === '2000') {
        const results = resp.data.data.results
        let clazzList = []
        clazzList = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const clazz = results[i]
          clazzList.push({
            id: clazz.id,
            name: clazz.name,
            info: clazz.introduction,
            applyStart: toChineseTimeString(new Date(clazz.start_time)),
            applyEnd: toChineseTimeString(new Date(clazz.end_time)),
            enrollment: clazz.people_number_limit,
            curEnroll: clazz.current_people_number,
            admitted: clazz.people_number_limit !== clazz.current_people_number,
            state: parseInt(clazz.state),
            img: 'https://i.loli.net/2020/01/10/QD97zMkbIs1hw4d.png'
          })
        }
        return clazzList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async getCourseList (classId) {
    try {
      const resp = await uniRequest.get('/course/course?page=1&page_size=999&clazz_id=' + classId)
      if (resp.data.code === '2000') {
        const results = resp.data.data.results
        let courseList = []
        courseList = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const course = results[i]
          courseList.push({
            id: course.id,
            name: course.name,
            type: course.type,
            spot: course.location,
            schedule: course.begin_time,
            state: course.state,
            moduleList: course.introduction.split(';'),
            lecturer: {
              id: course.teacher.id,
              avatar: 'https://i.loli.net/2020/01/09/iEZpONujHL4Sc13.png',
              name: course.teacher.name,
              title: course.teacher.title,
              introduction: course.teacher.introduction,
              contact: course.teacher.contact_way
            }
          })
        }
        return courseList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
