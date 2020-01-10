<template>
  <view>
    <title-bar
      title="活动详情"
    />
    <cover-image
      :src="activityData.image"
      @load="changeLoading"
    />

    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 活动介绍
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      活动名称：{{ activityData.name }}<br>
      主办单位：{{ activityData.organizer }}<br>
      活动时间：{{ stringify(activityData.start_time) }}<br>
      活动地点：{{ activityData.address }}
    </view>
    <view
      class="text-content padding bg-white"
      v-text="activityData.arrangement"
    >
      暂无活动介绍
    </view>

    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 报名须知
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      报名开始时间：{{ stringify(activityData.enroll_start_time) }}<br>
      报名截止时间：{{ stringify(activityData.enroll_end_time) }}<br>
      面向人群：{{ activityData.crowdOriented }}<br>
      报名人数：{{ activityData.current_people_number }}/{{ activityData.people_number_limit }}<br>
      收费标准：{{ activityData.price }}元/人
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
    <loading-modal :display="loadModal" />
  </view>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import STATE from '@/request/constant'
import { toChineseTimeString } from '@/request/util'
export default {
  components: {
    TitleBar
  },
  data () {
    return {
      loadModal: false,
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
    stringify (time) {
      return toChineseTimeString(new Date(time))
    },
    changeLoading () {
      this.loadModal = false
    },
    test (e) {
      console.log(e)
    }
  },
  onLoad (option) {
    this.loadModal = true
    this.activityData = JSON.parse(decodeURIComponent(option.data))
    console.log('activityState', this.activityData.state)
    if (this.activityData.state === STATE.ACTIVITY.ENROLLING) {
      this.canApply = this.activityData.current_people_number < this.activityData.people_number_limit
      if (!this.canApply) {
        this.applyButtonText = '人数已满'
      }
    } else if (this.activityData.state === STATE.ACTIVITY.UNOPENED) {
      this.canApply = false
      this.applyButtonText = '报名尚未开始'
    } else {
      this.canApply = false
      this.applyButtonText = '报名已结束'
    }
  }
}
</script>

<style>

</style>
