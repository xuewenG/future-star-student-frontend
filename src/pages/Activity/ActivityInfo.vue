<template>
  <view>
    <title-bar
      title="活动详情"
    />
    <cover-image src="/static/BasicsBg.png" />
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 活动介绍
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      报名时间：{{ activityData.applyTime }}<br>
      活动时间：{{ activityData.activityTime }}
    </view>
    <view
      class="text-content padding bg-white"
      v-text="activityData.intro"
    >
      暂无活动介绍
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
      activityData: {
        applyTime: '2019年12月25日-2020年1月12日',
        activityTime: '2020年1月23日',
        intro: '这是一次校友活动'
      }
    }
  }
}
</script>

<style>

</style>
