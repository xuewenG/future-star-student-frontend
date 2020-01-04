<template>
  <view>
    <top-nav
      :nav-list="navigatorList"
      @cur-changed="getCurrentList"
    />
    <hot-activity
      v-if="TabCur===0"
    />
    <finished-activity
      v-if="TabCur===1"
      top-nav="32"
    />
    <my-activity
      v-if="TabCur===2"
    />
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import HotActivity from '@/pages/Activity/HotActivity.vue'
import FinishedActivity from '@/pages/Activity/FinishedActivity.vue'
import MyActivity from '@/pages/Activity/MyActivity.vue'
export default {
  components: {
    TopNav,
    HotActivity,
    FinishedActivity,
    MyActivity
  },
  data () {
    return {
      TabCur: 0,
      navigatorList: ['当前热门', '往期活动', '我参与的']
    }
  },
  mounted () {
    this.getCurrentList(0)
  },
  methods: {
    getCurrentList (i) {
      this.TabCur = i
    }
  }
}
</script>

<style>
</style>
