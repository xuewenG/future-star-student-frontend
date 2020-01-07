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
      >
        <view class="swiper-item">
          <image
            :src="item.swiperImg"
            mode="aspectFill"
          />
        </view>
      </swiper-item>
    </swiper>

    <item-list
      :list="campList"
    />
    <!-- <view class="cu-list menu sm-border card-menu margin-top">
      <view
        v-for="(campItem, index) in campList"
        :key="index"
        class="cu-item arrow"
        @tap="showCampInfo"
      >
        <view
          class="cu-avatar round lg"
          :style="'background-image:url('+campItem.campImg+');'"
        />
        <view class="margin-left content flex-sub">
          <view v-text="campItem.intro" />
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    ItemList
  },
  data () {
    return {
      campList: [{
        id: 0,
        type: 'image',
        swiperImg: '/static/EdStarsApply.png',
        img: '/static/EdStarsLogo.png',
        name: '未来之星创新院第1期招生中',
        url: '/pages/Apply/CampInfo'
      }, {
        id: 1,
        type: 'image',
        swiperImg: '/static/EdStarsApply.png',
        img: '/static/EdStarsLogo.png',
        name: '未来之星创新院第1期招生中',
        url: '/pages/Apply/CampInfo'
      }, {
        id: 2,
        type: 'image',
        swiperImg: '/static/EdStarsApply.png',
        img: '/static/EdStarsLogo.png',
        name: '未来之星创新院第1期招生中',
        url: '/pages/Apply/CampInfo'
      }, {
        id: 3,
        type: 'image',
        swiperImg: '/static/EdStarsApply.png',
        img: '/static/EdStarsLogo.png',
        name: '未来之星创新院第1期招生中',
        url: '/pages/Apply/CampInfo'
      }, {
        id: 4,
        type: 'image',
        swiperImg: '/static/EdStarsApply.png',
        img: '/static/EdStarsLogo.png',
        name: '未来之星创新院第1期招生中',
        url: '/pages/Apply/CampInfo'
      }],
      cardCur: 0
    }
  },
  computed: {
    getSwipperCampList () {
      return this.campList.slice(0, 4)
    }
  },
  methods: {
    cardSwiper (e) {
      this.cardCur = e.detail.current
    },
    showCampInfo (e) {
      console.log(e)
      uni.navigateTo({
        url: '/pages/Apply/CampInfo?campId=' + this.cardCur,
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>
</style>
