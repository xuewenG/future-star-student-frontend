<template>
  <view>
    <cover-image src="/static/BasicsBg.png" />
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-green" /> 课程介绍
      </view>
    </view>
    <view class="text-content padding bg-white text-sm">
      时间：{{ courseData.time }}<br>
      地点：{{ courseData.place }}
    </view>
    <view
      class="text-content padding bg-white"
      v-text="courseData.intro"
    >
      暂无课程介绍
    </view>
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-green" /> 讲师
      </view>
    </view>
    <view class="cu-list menu-avatar">
      <view class="cu-item">
        <view
          class="cu-avatar round lg"
          :style="'background-image:url('+courseData.teacher.avatar+');'"
        />
        <view class="content flex-sub">
          <view v-text="courseData.teacher.name" />
          <view
            class="text-gray text-sm flex justify-between"
            v-text="courseData.teacher.title"
          >
            暂无更多信息
          </view>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <view class="text-sm">
            联系方式：
          </view>
          <view
            class="text-sm"
            v-text="courseData.teacher.contact"
          />
        </view>
      </view>
      <view
        class="text-content padding bg-white"
        v-text="courseData.teacher.intro"
      >
        暂无讲师介绍
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    courseData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
