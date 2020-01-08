import uniRequest from 'uni-request'
export default {
  async login (data) {
    console.log('login')
    try {
      const response = await uniRequest.post('/student/login', data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}
