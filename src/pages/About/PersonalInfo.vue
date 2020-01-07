<template>
  <view>
    <title-bar
      title="我的信息"
    />
    <view
      class="cu-list menu sm-border"
    >
      <view class="cu-item arrow content sm-border flex-sub">
        基本信息
      </view>
      <view class="cu-item arrow content sm-border flex-sub">
        教育/工作背景
      </view>
      <view class="cu-item arrow content sm-border flex-sub">
        公司/项目信息
      </view>
      <view class="cu-item arrow content sm-border flex-sub">
        介绍人信息
      </view>
    </view>
  </view>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
export default {
  components: {
    TitleBar
  },
  data () {
    return {
      id: 0,
      personalInfoList: [
        {
          id: 0,
          img: '/static/EdStarsLogo.png',
          name: '',
          intro: '',
          url: ''
        }
      ]
    }
  },
  onLoad (option) {
    this.id = option.id
  }
}
</script>

<style scoped>

</style>
