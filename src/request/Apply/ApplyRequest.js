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
  }
}
