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
        @tap="naviagteTo(index)"
      >
        <image
          :src="item.image"
          mode="aspectFit"
        />
      </swiper-item>
    </swiper>
    <top-nav
      :nav-list="navigatorList"
      @cur-changed="getCurrentList"
    />
    <item-list
      v-if="TabCur===0"
      :list="ongoingActivityList"
    />
    <item-list
      v-if="TabCur===1"
      :list="awaitActivityList"
    />
    <loading-modal :display="loadModal" />
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import ItemList from '@/components/ItemList.vue'
import ActivityRequest from '@/request/Activity/ActivityRequest.js'
export default {
  components: {
    TopNav,
    ItemList
  },
  data () {
    return {
      TabCur: 0,
      loadModal: false,
      navigatorList: ['正在进行', '即将开始'],
      swiperList: [
        // {
        //   id: 0,
        //   type: 'image',
        //   url: '/static/EdStarsQualityClass.png'
        // }, {
        //   id: 1,
        //   type: 'image',
        //   url: '/static/EdStarsQualityClass.png'
        // }, {
        //   id: 2,
        //   type: 'image',
        //   url: '/static/EdStarsQualityClass.png'
        // }
      ],
      ongoingActivityList: [],
      awaitActivityList: []
    }
  },
  mounted () {
    this.loadModal = true
    ActivityRequest.getOngoingActivityList().then(r => {
      this.ongoingActivityList = r
      this.loadModal = false
      // this.swiperList = this.ongoingActivityList.slice(0,
      //  this.ongoingActivityList.length < 3 ? this.ongoingActivityList.length : 3)
      this.swiperList = this.ongoingActivityList.slice(0, 2)
      console.log(this.swiperList)
    })
    ActivityRequest.getAwaitActivityList().then(r => {
      this.awaitActivityList = r
    })
  },
  methods: {
    getCurrentList (i) {
      this.TabCur = i
    },
    naviagteTo (index) {
      const item = this.swiperList[index]
      /* global uni:false */
      uni.navigateTo({
        url: item.url + '?data=' + encodeURIComponent(JSON.stringify(item.data)),
        fail: function () {
          console.log('fail to navigate to ' + item.url)
        },
        success: function () {
          console.log('succeed to navigate to ' + item.url)
        }
      })
    }
  }
}
</script>

<style>
</style>
