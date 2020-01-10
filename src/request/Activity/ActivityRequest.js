import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async getOngoingActivityList () {
    console.log('getOngoingActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity?page=1&page_size=999&activity_state=' + STATE.ACTIVITY.ENROLLING)
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
            url: '/pages/Activity/ActivityInfo',
            data: {
              id: item.id
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
  },

  async getAwaitActivityList () {
    console.log('getAwaitActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity?page=1&page_size=999&activity_state=' + STATE.ACTIVITY.UNOPENED)
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
            url: '/pages/Activity/ActivityInfo',
            data: {
              id: item.id
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
  },

  async getFinishedActivityList () {
    console.log('getFinishedActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity?page=1&page_size=999&activity_state=' + STATE.ACTIVITY.CLOSED)
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
            url: '/pages/Activity/ActivityInfo',
            data: {
              id: item.id
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
