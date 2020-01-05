<template>
  <view>
    <title-bar
      title="活动详情"
    />
    <cover-image src="/static/EdStarsQualityClass.png" />

    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 活动介绍
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      主办单位：{{ activityData.host }}<br>
      活动时间：{{ activityData.activityTime }}<br>
      活动地点：{{ activityData.activityPlace }}
    </view>
    <view
      class="text-content padding bg-white"
      v-text="activityData.detail"
    >
      暂无活动介绍
    </view>

    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 报名须知
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      报名开始时间：{{ activityData.activityTime }}<br>
      报名截止时间：{{ activityData.activityPlace }}<br>
      面向人群：{{ activityData.crowdOriented }}<br>
      报名人数：{{ activityData.applicantsNumber }}/{{ activityData.applicantsLimit }}<br>
      收费标准：{{ activityData.charge }}
    </view>

    <view class="padding flex flex-direction">
      <button
        class="cu-btn bg-green lg"
        :disabled="!canApply"
        v-text="applyButtonText"
      >
        加载中...
      </button>
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
        host: '霸都国家飞禽繁育与生态研究中心',
        activityTime: '2020年1月23日',
        activityPlace: '安徽省合肥市天鹅湖国际大酒店',
        detail: '这是一次校友活动',
        applyBeginTime: '2019年12月25日',
        applyEndTime: '2020年1月12日',
        crowdOriented: '第三、四期未来之星创新班学员',
        applicantsNumber: 42,
        applicantsLimit: 50,
        charge: '350元/人'
      },
      canApply: true,
      applyButtonText: '现在报名'
    }
  },
  methods: {
    getActivityType (id) {
      return (id-1)/3
    }
  },
  onLoad (option) {
    if(this.getActivityType(option.id) === 0){
      this.canApply = this.activityData.applicantsNumber < this.activityData.applicantsLimit
      if(!this.canApply){
        this.applyButtonText = '人数已满'
      }
    }
    else if(this.getActivityType(option.id) === 1){
      this.canApply = false
      this.applyButtonText = '报名尚未开始'
    }
    else if(this.getActivityType(option.id) === 2){
      this.canApply = false
      this.applyButtonText = '报名已结束'
    }
  }
}
</script>

<style>

</style>
