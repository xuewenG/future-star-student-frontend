import uniRequest from 'uni-request'
import STATE from '@/request/constant'
import { toLocalStudentData, toRemoteStudentData } from '@/request/util'

export default {
  async validateIsSchoolmate (id) {
    try {
      const resp = await uniRequest.get('/student/student/' + parseInt(id))
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        console.log('validate', resp.data.data.state)
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
  },

  async getSchoolmateInfo (schoolmateId) {
    console.log('getSchoolmateInfo')
    try {
      const resp = await uniRequest.get('/student/student/' + parseInt(schoolmateId))
      if (resp.data.code === STATE.REQUEST.SUCCESS) {
        return toLocalStudentData(resp.data.data)
      } else {
        console.log(resp.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  },

  async editSchoolmateInfo (schoolmateId, student) {
    console.log('editSchoolmateInfo')
    try {
      const resp = await uniRequest.put('/student/student/' + parseInt(schoolmateId), toRemoteStudentData(student), {
        dataType: 'JSON',
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = JSON.parse(resp.data)
      return {
        success: data.code === STATE.REQUEST.SUCCESS,
        msg: data.msg
      }
    } catch (error) {
      console.log(error)
    }
  }
}
