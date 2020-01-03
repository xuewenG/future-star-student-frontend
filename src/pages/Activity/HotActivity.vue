<template>
  <view>
    <swiper
      class="screen-swiper square-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item
        v-for="(item,index) in swiperList"
        :key="index"
      >
        <image
          v-if="item.type=='image'"
          :src="item.url"
          mode="aspectFill"
        />
        <video
          v-if="item.type=='video'"
          :src="item.url"
          autoplay
          loop
          muted
          :show-play-btn="false"
          :controls="false"
          objectFit="cover"
        />
      </swiper-item>
    </swiper>
    <top-nav
      :nav-list="navigatorList"
      @cur-changed="getCurrentList"
    />
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
export default {
  components: {
    TopNav
  },
  data () {
    return {
      TabCur: 0,
      navigatorList: ['正在进行', '即将开始']
    }
  },
  mounted () {
    this.getCurrentList(0)
  },
  methods: {
    getCurrentList (i) {
      this.PageCur = i
      this.currentList = this.courseItemList[i]
    }
  }
}
</script>

<style>
</style>
