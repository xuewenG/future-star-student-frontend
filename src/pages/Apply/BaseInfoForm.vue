<template>
  <view>
    <cu-custom
      bg-color="bg-white"
      :is-back="true"
    >
      <block slot="backText">
        返回
      </block>
      <block slot="content">
        未来之星
      </block>
    </cu-custom>
    <form>
      <view class="cu-bar bg-white sm-border">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 基本信息
        </view>
      </view>
      <view class="cu-form-group">
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
        <view
          class="cu-form-group"
          style="

  -webkit-justify-content: start;
  justify-content: start;"
        >
          <text class="cuIcon-male text-cyan" />
          <view class="title margin-left">
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
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-weixin text-cyan" />
        <view class="title margin-left">
          微信号码
        </view>
        <input
          v-model="baseInfoForm.wx"
          placeholder="请输入微信号"
          name="input"
          @blur="checkWechat"
        >
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
      <view class="cu-list menu sm-border">
        <view class="cu-item flex">
          <view @tap="checkBefore">
            <text class="lg text-grey cuIcon-back" />
            <text
              class="basis-xl margin-left content"
            >
              上一页
            </text>
          </view>
          <view @tap="checkNext">
            <text
              class="basis-xl margin-right content"
            >
              下一页
            </text>
            <text class="lg text-grey cuIcon-right" />
          </view>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
import ApplyRequest from '@/request/Apply/ApplyRequest.js'
export default {
  data () {
    return {
      baseInfoForm: {
        name: '',
        sex: 0,
        birthDate: '2018-12-25',
        tel: '',
        wx: '',
        mail: '',
        city: ['广东省', '广州市', '海珠区']
      },
      student: {
        baseInfo: {},
        educationInfo: {},
        companyInfo: {},
        referees: [],
        otherInfo: {},
        clazz: ''
      },
      sex: ''
    }
  },
  onLoad (option) {
    console.log('您要报的班级', option.clazz)
    ApplyRequest.getStudentInfo(uni.getStorageSync('student_id')).then(student => {
      console.log(student)
      if (student.name) {
        this.student = {
          baseInfo: {
            name: student.name,
            sex: student.gender,
            birthDate: student.birthday,
            tel: student.phone_number,
            mail: student.email,
            city: student.city.split('|'),
            wx: student.wx
          },
          educationInfo: {
            education: student.education,
            graduation: student.school,
            career: '2004-2008' + '/' + student.previous_company + '/' + student.previous_position,
            profession: student.profession
          },
          companyInfo: {
            companyBrand: student.company.name,
            website: student.company.website,
            appName: student.company.wx_public,
            setup: student.company.create_time,
            location: student.company.city.split('|'),
            staffNum: student.company.number_employee,
            positions: student.company.position.split('·'),
            companyInfo: student.company.introduction,
            operationData: student.company.company_data,
            profitScale: student.company.income_scale,
            finance: student.company.financing_situation,
            financeDetails: '',
            companyValue: student.company.value_of_assessment,
            businessList: [],
            supply: ''
          },
          clazz: parseInt(option.clazz),
          referees: [],
          otherInfo: {}
        }
        this.baseInfoForm = this.student.baseInfo
        this.sex = this.student.baseInfo.sex === 0 ? 'male' : 'female'
        console.log(this.sex)
        console.log(this.student)
      }

      this.student.clazz = parseInt(option.clazz)
      console.log(this.student)
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
      return true
    },
    checkWechat (e) {
      this.checkFormWechat(e.detail.value)
    },
    checkFormWechat (wx) {
      if (wx === null || wx === '') {
        this.showToast('请填入微信号')
        return false
      }
      return true
    },
    sexSelect (e) {
      this.sex = e.detail.value
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
    checkNext () {
      if (!this.checkFormName(this.baseInfoForm.name)) {
        return
      }
      if (!this.checkFormSex(this.baseInfoForm.sex)) {
        return
      }
      if (!this.checkFormTel(this.baseInfoForm.tel)) {
        return
      }
      if (!this.checkFormWechat(this.baseInfoForm.wx)) {
        return
      }
      if (!this.checkFormMail(this.baseInfoForm.mail)) {
        return
      }
      this.baseInfoForm.sex = this.sex === 'male' ? 0 : 1
      this.student.baseInfo = this.baseInfoForm
      // this.student.baseInfo.city = this.baseInfoForm.city.join('|')
      console.log(this.student)
      uni.navigateTo({
        url: '/pages/Apply/EducationInfo?data=' + encodeURIComponent(JSON.stringify(this.student)),
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res)
        }
      })
    },
    checkBefore () {
      this.showToast('已经是第一页')
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
.cu-form-group picker .picker {
  text-align: start;
}
</style>
