import uniRequest from 'uni-request'
export default {
  async getUser () {
    console.log('getUser')
    try {
      const response = await uniRequest.get('/user?ID=12345')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}
