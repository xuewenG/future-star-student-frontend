<template>
  <view>
    <title-bar
      title="基本信息"
    />
    <form>
      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 教育/工作背景
        </view>
      </view>
      <radio-group
        class="block"
        @change="selectEducation"
      >
        <view class="cu-bar bg-white cu-item">
          <view class="action">
            <text class="cuIcon-profile text-cyan margin-left" />
            <text class="margin-left">
              最高学历
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-list menu text-left">
          <view
            v-for="(educationItem, index) in educationList"
            :key="index"
            class="cu-item"
          >
            <label class="flex justify-between align-center flex-sub">
              <radio
                class="blue radio"
                :class="education===educationItem?'checked':''"
                :checked="education===educationItem?true:false"
                :value="educationItem"
              />
              <view class="flex-sub margin-left">{{ educationItem }}</view>
              <input
                v-if="educationItem==='其他'"
                v-model="otherEducation"
                placeholder="请输入学历"
                name="input"
              >
            </label>
          </view>
        </view>
      </radio-group>
      <view class="cu-list menu solids-top">
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/college.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              最高学历毕业院校及起止时间
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如：2004-2008/北京大学/计算机科学/学士
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="educationInfoForm.graduation"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述格式输入毕业院校及起止时间"
            @blur="checkGraduation"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/company.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              您创业前所在公司、职位及时间
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如：2010-2015/好未来/产品经理
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="educationInfoForm.career"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述格式输入就业经历"
            @blur="checkCarrer"
          />
        </view>
        <view class="padding flex flex-direction">
          <button
            class="cu-btn bg-green lg"
            @tap="saveChanges"
          >
            确认修改
          </button>
        </view>
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
      educationInfoForm: {
        education: '',
        graduation: '',
        career: '',
        profession: ''
      },
      otherEducation: '',
      educationList: ['博士', '硕士', '本科', '专科', '其他'],
      professionList: ['素质教育类', '教育技术类', '学科教育类', '教育信息化类', '幼小教育类'],
      student: {},
      education: ''
    }
  },
  methods: {
    checkEducation (education) {
      const other = education === '其他' && this.otherEducation === ''
      if (education === null || education === '' || other) {
        this.showToast('最高学历不能为空')
        return false
      }
      // this.educationInfoForm.education = education
      return true
    },
    selectEducation (e) {
      // this.checkEducation(e.detail.value)
      this.educationInfoForm.education = e.detail.value
    },
    checkTextArea (text, length, info) {
      const textArray = text.split('/')
      if (text === '' || text === null) {
        this.showToast(info + '不能为空')
        return false
      } else if (textArray.length !== length) {
        this.showToast(info + '格式错误')
        return false
      } else {
        const time = textArray[0].split('-')
        console.log(time)
        if (time.length === 1) {
          this.showToast(info + '起止时间格式错误')
          return false
        }
      }
      return true
    },
    checkGraduation (e) {
      this.checkTextArea(e.detail.value, 4, '最高学历毕业院校')
    },
    checkCarrer (e) {
      this.checkTextArea(e.detail.value, 3, '工作经历')
    },
    checkBefore () {
      console.log('应返回基本信息页，同时保存当前页面数据')
    },
    saveChanges () {
      if (this.otherEducation !== '') {
        this.educationInfoForm.education = this.otherEducation
      }
      if (!this.checkEducation(this.educationInfoForm.education)) {
        return
      }
      if (!this.checkTextArea(this.educationInfoForm.graduation, 4, '最高学历毕业院校')) {
        return
      }
      if (!this.checkTextArea(this.educationInfoForm.career, 3, '工作经历')) {
        return
      }
      console.log(this.educationInfoForm)
      this.student.educationInfo = this.educationInfoForm
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
    },
    onLoad () {
      SchoolmateInfoRequest.getSchoolmateInfo(uni.getStorageSync('student_id')).then(student => {
        console.log('student', student)
        this.student = student
        this.educationInfoForm = this.student.educationInfo
        let found = false
        for (let i = 0; i < this.educationList.length; i++) {
          if (this.educationInfoForm.education === this.educationList[i]) {
            this.education = this.educationInfoForm.education
            found = true
          }
        }
        if (!found) {
          this.education = '其他'
          this.otherEducation = this.educationInfoForm.education
        }
      })
    }
  }
}
</script>

<style>
</style>
