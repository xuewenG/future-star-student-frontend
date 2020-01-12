<template>
  <view>
    <title-bar
      title="基本信息"
    />
    <form>
      <view class="cu-bar bg-white margin-top-sm">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 基本信息
        </view>
      </view>
      <view class="cu-form-group margin-top">
        <text class="cuIcon-expressman text-cyan" />
        <view class="title margin-left">
          姓名
        </view>
        <input
          v-model="baseInfoForm.name"
          placeholder="请输入姓名"
          name="input"
          @blur="checkName"
        >
      </view>
      <radio-group
        class="block"
        @change="sexSelect"
      >
        <view class="cu-form-group">
          <text class="cuIcon-male text-cyan" />
          <view class="title">
            性别
          </view>
          <radio
            class="blue radio margin-right-sm sm"
            :class="sex==='male'?'checked':''"
            :checked="sex==='male'?true:false"
            value="male"
          />
          <p class="margin-right">
            男
          </p>
          <radio
            class="blue radio margin-right-sm sm"
            :class="sex==='female'?'checked':''"
            :checked="sex==='female'?true:false"
            value="female"
          />
          <p>女</p>
        </view>
      </radio-group>
      <view class="cu-form-group">
        <text class="cuIcon-calendar text-cyan" />
        <view class="title margin-left">
          出生日期
        </view>
        <picker
          mode="date"
          :value="baseInfoForm.birthDate"
          start="1920-01-12"
          end="2020-01-12"
          @change="selectBirthDate"
        >
          <view class="picker">
            {{ baseInfoForm.birthDate }}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-mobilefill text-cyan" />
        <view class="title margin-left">
          联系电话
        </view>
        <input
          v-model="baseInfoForm.tel"
          placeholder="请输入联系电话"
          name="input"
          @blur="checkTel"
        >
        <view class="cu-capsule radius">
          <view class="cu-tag bg-blue ">
            +86
          </view>
          <view class="cu-tag line-blue">
            中国大陆
          </view>
        </view>
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-mail text-cyan" />
        <view class="title margin-left">
          常用邮箱
        </view>
        <input
          v-model="baseInfoForm.mail"
          placeholder="请输入常用邮箱"
          name="input"
          @blur="checkMail"
        >
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-locationfill text-orange" />
        <view class="title margin-left">
          常驻城市
        </view>
        <picker
          mode="region"
          :value="baseInfoForm.city"
          @change="selectCity"
        >
          <view class="picker">
            {{ baseInfoForm.city[0] }}·{{ baseInfoForm.city[1] }}·{{ baseInfoForm.city[2] }}
          </view>
        </picker>
      </view>
      <view class="padding flex flex-direction">
        <button
          class="cu-btn bg-green lg"
          @tap="saveChanges"
        >
          确认修改
        </button>
      </view>
    </form>
  </view>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import SchoolmateInfoRequest from '@/request/About/SchoolmateInfoRequest'
export default {
  components: {
    TitleBar
  },
  data () {
    return {
      baseInfoForm: {
        name: '',
        sex: 'male',
        birthDate: '2018-12-25',
        tel: '',
        mail: '',
        city: ['广东省', '广州市', '海珠区']
      },
      student: {
        baseInfo: {}
      },
      sex: ''
    }
  },
  onLoad () {
    SchoolmateInfoRequest.getSchoolmateInfo(uni.getStorageSync('student_id')).then(student => {
      console.log('student', student)
      this.student = student
      this.baseInfoForm = this.student.baseInfo
      this.sex = this.baseInfoForm.sex === 0 ? 'male' : 'female'
      // const cityFormat = student.city.split('·')
      // if (student.name) {
      //   this.student = {
      //     baseInfo: {
      //       name: student.name,
      //       sex: student.gender === 0 ? 'male' : 'female',
      //       birthDate: student.birthday,
      //       tel: student.phone_number,
      //       mail: student.email,
      //       city: student.city.split('|')
      //     }
      //   }
      //   this.baseInfoForm = this.student.baseInfo
      //   console.log('baseInfoForm', this.baseInfoForm)
      // }
    })
  },
  methods: {
    checkName (e) {
      this.checkFormName(e.detail.value)
    },
    checkFormName (name) {
      if (name === null || name === '') {
        this.showToast('姓名不能为空')
        return false
      }
      return true
    },
    checkFormSex (sex) {
      if (sex === null || sex === '') {
        this.showToast('性别不能为空')
        return false
      }
      console.log('check', sex)
      this.sex = sex
      this.baseInfoForm.sex = this.sex === 'male' ? 0 : 1
      return true
    },
    sexSelect (e) {
      this.checkFormSex(e.detail.value)
    },
    selectBirthDate (e) {
      this.baseInfoForm.birthDate = e.detail.value
    },
    selectCity (e) {
      this.baseInfoForm.city = e.detail.value
    },
    checkFormTel (tel) {
      if (tel === null || tel === '') {
        this.showToast('手机号码不能为空')
        return false
      } else if (!RegExp(/^1[34578]\d{9}$/).test(tel)) {
        this.showToast('手机号码格式错误')
        return false
      }
      return true
    },
    checkTel (e) {
      this.checkFormTel(e.detail.value)
    },
    checkFormMail (mail) {
      if (mail === null || mail === '') {
        this.showToast('邮箱不能为空')
        return false
      } else if (!RegExp(/^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(mail)) {
        this.showToast('邮箱格式错误')
        return false
      }
      return true
    },
    checkMail (e) {
      this.checkFormMail(e.detail.value)
    },
    saveChanges () {
      if (!this.checkFormName(this.baseInfoForm.name)) {
        return
      }
      if (!this.checkFormSex(this.sex)) {
        return
      }
      if (!this.checkFormTel(this.baseInfoForm.tel)) {
        return
      }
      if (!this.checkFormMail(this.baseInfoForm.mail)) {
        return
      }
      this.student.baseInfo = this.baseInfoForm
      this.student.baseInfo.city = this.baseInfoForm.city.join('|')
      this.student.baseInfo.sex = this.sex === 'male' ? 0 : 1
      console.log('sex', this.sex)
      console.log('student', this.student)
      SchoolmateInfoRequest.editSchoolmateInfo(uni.getStorageSync('student_id'), this.student).then(r => {
        const status = r
        console.log('status', status)
        if (status.success) {
          uni.showToast({
            title: '修改成功',
            icon: 'success'
          })
          uni.navigateBack({
            delta: 1
          })
        } else {
          uni.showToast({
            title: status.msg
          })
        }
      })
    },
    showToast (info) {
      uni.showToast({
        title: info,
        icon: 'none'
      })
    }
  }
}
</script>

<style>
</style>
