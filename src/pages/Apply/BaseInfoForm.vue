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
            :class="sex=='male'?'checked':''"
            :checked="sex=='male'?true:false"
            value="男"
          />
          <p class="margin-right">
            男
          </p>
          <radio
            class="blue radio margin-right-sm sm"
            :class="sex=='female'?'checked':''"
            :checked="sex=='female'?true:false"
            value="女"
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
export default {
  data () {
    return {
      baseInfoForm: {
        name: '',
        sex: 'male',
        birthDate: '2018-12-25',
        tel: '',
        mail: '',
        city: ['广东省', '广州市', '海珠区']
      }
    }
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
      } else if (sex === '男') {
        this.baseInfoForm.sex = 'male'
      } else {
        this.baseInfoForm.sex = 'female'
      }
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
      if (!this.checkFormMail(this.baseInfoForm.mail)) {
        return
      }
      console.log(this.baseInfoForm)
      uni.navigateTo({
        url: '/pages/Apply/EducationInfo',
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
</style>
