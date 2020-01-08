import uniRequest from 'uni-request'
import regeneratorRuntime from 'regenerator-runtime'

export default {
  async getOngoingActivityList () {
    console.log('getOngoingActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity?page=1&page_size=999&state=1')
      if (resp.data.code === '2000') {
        let list = []
        list = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          list.push({
            id: item.id,
            name: item.name,
            img: '../../static/EdStarsLogo.png',
            intro: '',
            url: '/pages/Activity/ActivityInfo'
          })
        }
        return list
      } else {
        console.error(resp.data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  },
  
  async getAwaitActivityList () {
    console.log('getAwaitActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity?page=1&page_size=999&state=0')
      if (resp.data.code === '2000') {
        let list = []
        list = []
        for (let i = 0; i < parseInt(resp.data.data.count); i++) {
          const item = resp.data.data.results[i]
          list.push({
            id: item.id,
            name: item.name,
            img: '../../static/EdStarsLogo.png',
            intro: '',
            url: '/pages/Activity/ActivityInfo'
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
