<template>
  <view class="cu-bar tabbar bg-white shadow foot">
    <view
      v-for="(module, index) in moduleList"
      :key="index"
      class="action"
      :data-cur="module.key"
      @click="NavChange"
    >
      <view class="cuIcon-cu-image">
        <image :src="'/static/tabbar/' + module.key + [PageCur===module.key?'_cur':''] + '.png'" />
      </view>
      <view :class="PageCur===module.key?'text-green':'text-gray'">
        {{ module.moduleName }}
      </view>
    </view>
  </view>
</template>

<script>
import SchoolmateInfoRequest from '@/request/About/SchoolmateInfoRequest'
export default {
  props: {
    moduleList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      PageCur: 'apply'
    }
  },
  methods: {
    NavChange (e) {
      if (e.currentTarget.dataset.cur === 0 || e.currentTarget.dataset.cur === 4) {
        this.PageCur = e.currentTarget.dataset.cur
        this.$emit('cur-changed', e.currentTarget.dataset.cur)
      } else {
        const uid = uni.getStorageSync('student_id')
        if (uid) {
          SchoolmateInfoRequest.validateIsSchoolmate(uid).then(r => {
            const isSchoolmate = r.isSchoolmate
            if (isSchoolmate) {
              this.PageCur = e.currentTarget.dataset.cur
              this.$emit('cur-changed', e.currentTarget.dataset.cur)
            } else {
              uni.showToast({
                title: '您还不是校友，请先报名',
                icon: 'none'
              })
            }
          })
        } else {
          console.log('uid', uid)
          uni.showToast({
            title: '您的登录存在问题，请重新登录',
            icon: 'none'
          })
        }
      }
    }
  }
}
</script>

<style>
</style>
