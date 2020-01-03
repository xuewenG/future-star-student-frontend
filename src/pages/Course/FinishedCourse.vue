<template>
  <view>
    <TitleBar title="课程信息" />
    <TopNav
      :nav-list="navigatorList"
      @cur-changed="(cur)=>{pageCur=cur}"
    />
  </view>
</template>
<script>
import TitleBar from '@/components/TitleBar.vue'
import TopNav from '@/components/TopNav.vue'
export default {
  components: {
    TopNav,
    TitleBar
  },
  data () {
    return {
      pageCur: 0,
      navigatorList: ['课程介绍', '课程资料', '同学列表']
    }
  },
  onLoad (option) {
    console.log(option.id)
  }
}
</script>

<style>
</style>
