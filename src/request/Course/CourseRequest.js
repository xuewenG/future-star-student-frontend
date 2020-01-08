import uniRequest from 'uni-request'
export default {
  async getOngoingCourseList (id) {
    console.log('getOngoingCourseList')
    try {
      const resp = await uniRequest.get('/clazz/clazz?page=1&page_size=999&student_id=' + id)
      if (resp.data.code === '2000') {
        let list = []
        list = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          list.push({
            id: item.id,
            name: item.name,
            img: '/static/EdStarsLogo.png',
            intro: '',
            url: '/pages/Course/OngoingCourse'
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
