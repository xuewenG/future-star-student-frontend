import uniRequest from 'uni-request'
export default {
  async getCampList () {
    console.log('getCampList')
    try {
      const resp = await uniRequest.get('/semester/semester')
      console.log(resp)
      if (resp.data.code === '2000') {
        console.log('获取学期列表成功')
        const results = resp.data.data.results
        console.log(results)
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
            swiperImg: '/static/EdStarsApply.png',
            img: '/static/EdStarsLogo.png',
            url: '/pages/Apply/CampInfo'
          })
        }
        console.log(campList)
        return campList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async getCampInfo (campId) {
    console.log('getCampInfo')
    try {
      const resp = await uniRequest.get('/clazz/clazz/page=1&page_size=999&semester_id=' + campId)
      console.log(resp)
      if (resp.data.code === '2000') {
        console.log('获取学期的班级列表成功')
        const results = resp.data.data.results
        console.log(results)
        let clazzList = []
        clazzList = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const clazz = results[i]
          clazzList.push({
            classId: clazz.id,
            className: clazz.name,
            classInfo: clazz.introduction,
            applyStart: clazz.start_time,
            applyEnd: clazz.end_time,
            enrollment: clazz.people_number_limit,
            curEnroll: clazz.current_people_number,
            state: parseInt(clazz.state),
            img: '../../static/EdStarsQualityClass.png'
          })
        }
        console.log(clazzList)
        return clazzList
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
