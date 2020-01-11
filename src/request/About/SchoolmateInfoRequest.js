import uniRequest from 'uni-request'
import STATE from '@/request/constant'

export default {
  async validateIsSchoolmate (id) {
    try {
      const resp = await uniRequest.get('/student/student/' + parseInt(id))
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        if (resp.data.data.state === STATE.SCHOOLMATE.VALID || resp.data.data.state === STATE.SCHOOLMATE.NOT_GRADUATE) {
          return {
            state: 'success',
            isSchoolmate: true,
            msg: '验证成功'
          }
        } else if (resp.data.data.state === STATE.SCHOOLMATE.INVALID) {
          return {
            state: 'fail',
            isSchoolmate: false,
            msg: '验证失败'
          }
        }
      } else {
        console.log(resp.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
