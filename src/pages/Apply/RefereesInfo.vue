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
      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 关于推荐人
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item">
          <text>本次创新院采取推荐制，您需要至少一位推荐人。</text>
        </view>
        <view class="cu-item">
          <text>推荐人需为知名企业家，或投资人，或学者，或未来之星校董、讲师、往届校友。</text>
        </view>
        <view class="cu-item">
          <text>请将《推荐表》发送给推荐人（若您的推荐人中有未来之星校董、讲师、校友，可直接进入初试环节）</text>
        </view>
        <view class="cu-item">
          <text>推荐表</text>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/referees.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              推荐人信息1:（姓名／公司／职位）
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="refereesForm.referees[0]"
            class="sm-border"
            maxlength="-1"
            placeholder="请按照上述格式填写推荐人信息"
            @blur="checkReferees"
          />
        </view>
        <view class="cu-item flex">
          <view @tap="checkBefore">
            <text class="lg text-grey cuIcon-back" />
            <text class="basis-xl margin-left content">
              上一页
            </text>
          </view>
          <view @tap="checkNext">
            <text class="basis-xl margin-right content">
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
      refereesForm: {
        referees: []
      },
      student: {}
    }
  },
  onLoad (student) {
    this.student = JSON.parse(decodeURIComponent(student.data))
    console.log(this.student)
  },
  methods: {
    checkFormReferees (referees) {
      if (referees.length === 0) {
        this.showToast('至少需要一位推荐人')
        return false
      }
      return true
    },
    checkReferees (e) {
      this.checkFormReferees(e.detail.value)
    },
    showToast (info) {
      uni.showToast({
        title: info,
        icon: 'none'
      })
    },
    checkBefore () {
      console.log('应返回公司项目信息页，同时保存当前页面数据')
    },
    checkNext () {
      if (!this.checkFormReferees(this.refereesForm.referees[0])) {
        return
      }
      console.log(this.refereesForm.referees[0])
      for (let i = 0; i < this.refereesForm.referees.length; i++) {
        const referee = this.refereesForm.referees[i].split('/')
        console.log(this.referee)
        this.student.referees.push({
          name: referee[0],
          company: referee[1],
          position: referee[2]
        })
        console.log(this.student.referees)
      }
      uni.navigateTo({
        url: '/pages/Apply/OtherInfo?data=' + encodeURIComponent(JSON.stringify(this.student)),
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res)
        }
      })
      console.log('前往其他信息页')
      console.log(this.refereesForm)
    }
  }
}
</script>

<style>
</style>
