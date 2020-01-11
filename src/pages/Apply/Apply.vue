<template>
  <view>
    <swiper
      class="card-swiper square-dot"
      indicator-dots="true"
      circular="true"
      autoplay="true"
      interval="5000"
      duration="500"
      indicator-color="#8799a3"
      indicator-active-color="#0081ff"
      @change="cardSwiper"
    >
      <swiper-item
        v-for="(item, index) in getSwipperCampList"
        :key="index"
        :class="cardCur==index?'cur':''"
        @click="showCampInfo(index)"
      >
        <view class="swiper-item">
          <image
            :src="item.data.swiperImg"
            mode="aspectFill"
          />
        </view>
      </swiper-item>
    </swiper>
    <item-list
      :list="campList"
    />
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import ApplyRequest from '@/request/Apply/ApplyRequest.js'
export default {
  components: {
    ItemList
  },
  data () {
    return {
      campList: [],
      cardCur: 0
    }
  },
  computed: {
    getSwipperCampList () {
      return this.campList.slice(0, 4)
    }
  },
  mounted () {
    ApplyRequest.getCampList().then(campList => {
      this.campList = campList
      console.log(this.campList)
    })
  },
  methods: {
    cardSwiper (e) {
      this.cardCur = e.detail.current
    },
    showCampInfo (index) {
      const item = this.getSwipperCampList[index]
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
