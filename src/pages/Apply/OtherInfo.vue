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
          <text class="cuIcon-titles text-orange" /> 其他信息
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/college.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              是否接受此考勤要求
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          <text>未来之星创新院名额宝贵，培训统一安排时间内，不接受因个人活动冲突的请假理由，如缺勤达到总课程的1/3将被劝退，您是否接受此考勤要求</text>
        </view>
        <radio-group
          class="block"
          @change="selectCheck"
        >
          <view class="cu-form-group">
            <radio
              class="blue radio margin-right-sm sm"
              :class="otherForm.check==='accept'?'checked':''"
              :checked="otherForm.check==='accept'?true:false"
              value="接受"
            />
            <p class="margin-right">
              接受
            </p>
            <radio
              class="blue radio margin-right-sm sm"
              :class="otherForm.check==='refuse'?'checked':''"
              :checked="otherForm.check==='refuse'?true:false"
              value="不接受"
            />
            <p>不接受</p>
          </view>
        </radio-group>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/applyReason.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              请简述您的申请理由(100字以内)
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="otherForm.applyReason"
            class="sm-border"
            maxlength="100"
            placeholder="请简述您的申请理由(100字以内)"
            @blur="checkApplyReason"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/contribution.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              您能为创新院的其他学员做出哪些贡献
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="otherForm.contributions"
            class="sm-border"
            maxlength="-1"
            placeholder="请填写您能做出的贡献"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/icon/canal.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left">
              您通过何种渠道了解到“未来创新院”
            </text>
          </view>
        </view>
        <checkbox-group
          class="block"
          @change="selectCanals"
        >
          <view class="cu-form-group cu-list menu text-left">
            <view
              v-for="(canalItem, index) in canalList"
              :key="index"
              class="cu-item"
            >
              <label class="flex justify-between align-center flex-sub">
                <checkbox
                  :class="canalItem.checked?'checked':''"
                  :checked="canalItem.checked?true:false"
                  :value="canalItem.value"
                />
                <view class="flex-sub margin-left">
                  {{ canalItem.value }}
                </view>
                <input
                  v-if="canalItem.value==='其他'"
                  v-model="otherCanal"
                  placeholder="请输入您的了解渠道"
                  name="input"
                >
              </label>
            </view>
          </view>
        </checkbox-group>
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
      <view class="btn-area margin-top padding">
        <button
          formType="submit"
          class="cu-btn bg-cyan shadow block"
          @tap="submitApplyForm"
        >
          提交
        </button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data () {
    return {
      otherForm: {
        check: 'accept',
        applyReason: '',
        contributions: '',
        canals: []
      },
      canalList: [
        {
          value: '微信朋友圈',
          checked: false
        }, {
          value: '朋友推荐',
          checked: false
        }, {
          value: '未来之星公众号：EdStars未来同学会',
          checked: false
        }, {
          value: '好未来官网',
          checked: false
        }, {
          value: '媒体报道',
          checked: false
        }, {
          value: '其他',
          checked: false
        }
      ],
      otherCanal: ''
    }
  },
  methods: {
    checkFormCheck (check) {
      if (check === null || check === '') {
        this.showToast('请选择是否接受考勤')
        return false
      } else if (check === '接受') {
        this.otherForm.check = 'accpt'
      } else {
        this.otherForm.check = 'refuse'
      }
      return true
    },
    selectCheck (e) {
      this.checkFormCheck(e.detail.value)
    },
    checkTextArea (text, info) {
      if (text === '') {
        this.showToast(info + '不能为空')
        return false
      }
      return true
    },
    checkApplyReason (e) {
      this.checkTextArea(e.detail.value, '申请理由')
    },
    selectCanals (e) {
      this.checkCanal(e.detail.value)
    },
    checkCanal (values) {
      const canal = this.canalList
      const other = (values.includes('其他') && this.otherCanal === '')
      const onlyOther = (values.length === 1 && other)
      if (values.length === 0 || onlyOther) {
        this.showToast('了解渠道不能为空')
        return false
      } else if (other) {
        this.showToast('请填入您其他了解渠道')
        return false
      }
      for (let i = 0, lenI = canal.length; i < lenI; ++i) {
        if (values.includes(canal[i].value)) {
          this.$set(canal[i], 'checked', true)
        } else {
          this.$set(canal[i], 'checked', false)
        }
      }
      this.otherForm.canals = values
      return true
    },
    checkBefore () {
      console.log('应返回推荐人页，同时保存当前页面数据')
    },
    checkNext () {
      if (this.otherCanal !== '') {
        this.otherForm.canals = this.otherCanal
      }
      if (!this.checkFormCheck(this.otherForm.check)) {
        return
      }
      if (!this.checkTextArea(this.otherForm.applyReason, '申请理由')) {
        return
      }
      if (!this.checkCanal(this.otherForm.canals)) {
        return
      }
      console.log(this.otherForm)
      this.showToast('已经是最后一页，请提交')
    },
    showToast (info) {
      uni.showToast({
        title: info,
        icon: 'none'
      })
    },
    submitApplyForm () {
      uni.redirectTo({
        url: '/pages/Apply/CampInfo',
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res)
        }
      })
      uni.showToast({
        title: '报名成功',
        duration: 3000
      })
      console.log(this.otherForm)
    }
  }
}
</script>

<style>
</style>
