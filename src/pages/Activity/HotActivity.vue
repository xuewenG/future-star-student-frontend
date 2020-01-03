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
    <view
      v-if="TabCur===0"
      class="cu-list menu sm-border card-menu margin-top"
    >
      <view
        v-for="(item, index) in ongoingActivityList"
        :key="index"
        class="cu-item arrow"
        @tap="showCampInfo"
      >
        <view class="content">
          <image
            :src="item.url"
            class="png"
            mode="aspectFit"
          />
          <text
            class="text-grey"
            v-text="item.name"
          />
        </view>
      </view>
    </view>
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
      navigatorList: ['正在进行', '即将开始'],
      swiperList: [{
        id: 0,
        type: 'image',
        url: '../../static/EdStarsLogo.png'
      }],
      ongoingActivityList: [
        {
          name: '热门活动1',
          url: '../../static/EdStarsLogo.png'
        }, {
          name: '热门活动2',
          url: '../../static/EdStarsLogo.png'
        }, {
          name: '热门活动3',
          url: '../../static/EdStarsLogo.png'
        }
      ],
      awaitActivityList: [
        {
          name: '即将上线的活动1',
          url: '../../static/EdStarsLogo.png'
        }, {
          name: '即将上线的活动2',
          url: '../../static/EdStarsLogo.png'
        }, {
          name: '即将上线的活动3',
          url: '../../static/EdStarsLogo.png'
        }
      ]
    }
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
