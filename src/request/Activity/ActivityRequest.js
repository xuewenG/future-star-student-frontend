import uniRequest from 'uni-request'
export default {
  async getOngoingActivityList () {
    console.log('getOngoingActivityList')
    try {
      const resp = await uniRequest.get('/activity/activity')
      if (resp.code === '2000') {
        console.log(resp.data)
      } else {
        console.log(resp.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
