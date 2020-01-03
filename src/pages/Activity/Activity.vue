<template>
  <view>
    <top-nav
      :nav-list="navigatorList"
      @cur-changed="getCurrentList"
    />
    <hot-activity
      v-if="TabCur===0"
    />
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import HotActivity from '@/pages/Activity/HotActivity.vue'
export default {
  components: {
    TopNav,
    HotActivity
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
      this.PageCur = i
    }
  }
}
</script>

<style>
</style>
