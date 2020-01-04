<template>
  <view>
    <cu-custom bg-color="bg-white">
      <block slot="content">
        未来之星
      </block>
    </cu-custom>
    <camp-item v-if="PageCur==='apply'" />
    <Course v-if="PageCur==='course'" />
    <view class="cu-bar tabbar bg-white shadow foot">
      <view
        v-for="(icon, index) in iconList"
        :key="index"
        class="action"
        :data-cur="icon.english"
        @click="NavChange"
      >
        <view class="cuIcon-cu-image">
          <image :src="'/static/tabbar/' + icon.english + [PageCur===icon.english?'_cur':''] + '.png'" />
        </view>
        <view :class="PageCur===icon.english?'text-green':'text-gray'">
          {{ icon.chinese }}
        </view>
      </view>
    </view>
    <Schoolmate v-if="PageCur==='schoolmate'" />
  </view>
</template>

<script>
import Course from '@/pages/Course/Course.vue'
import CampItem from '@/components/CampItem.vue'
import Schoolmate from '@/pages/Schoolmate/Schoolmate.vue'
export default {
  components: {
    CampItem,
    Course,
    Schoolmate
  },
  data () {
    return {
      PageCur: 'apply',
      iconList: [
        {
          english: 'apply',
          chinese: '报名'
        }, {
          english: 'course',
          chinese: '班课'
        }, {
          english: 'schoolmate',
          chinese: '校友'
        }, {
          english: 'activity',
          chinese: '活动'
        }, {
          english: 'about',
          chinese: '我的'
        }
      ]
    }
  },
  methods: {
    NavChange: function (e) {
      this.PageCur = e.currentTarget.dataset.cur
    }
  }
}
</script>

<style>
</style>
