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
          mode="aspectFit"
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
    <item-list
      v-if="TabCur===0"
      :list="ongoingActivityList"
    />
    <item-list
      v-if="TabCur===1"
      :list="awaitActivityList"
    />
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
      navigatorList: ['正在进行', '即将开始'],
      swiperList: [
        {
          id: 0,
          type: 'image',
          url: '/static/EdStarsQualityClass.png'
        }, {
          id: 1,
          type: 'image',
          url: '/static/EdStarsQualityClass.png'
        }, {
          id: 2,
          type: 'image',
          url: '/static/EdStarsQualityClass.png'
        }
      ],
      ongoingActivityList: [
        {
          id: 1,
          name: '热门活动1',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }, {
          id: 2,
          name: '热门活动2',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }, {
          id: 3,
          name: '热门活动3',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }
      ],
      awaitActivityList: [
        {
          id: 4,
          name: '即将上线的活动1',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }, {
          id: 5,
          name: '即将上线的活动2',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }, {
          id: 6,
          name: '即将上线的活动3',
          img: '../../static/EdStarsLogo.png',
          intro: '',
          url: '/pages/Activity/ActivityInfo'
        }
      ]
    }
  },
  mounted () {
    // this.ongoingActivityList = ActivityRequest.getOngoingActivityList()
    this.ongoingActivityList = ActivityRequest.getOngoingActivityList().then(r => {
      this.ongoingActivityList = r
      console.log(this.ongoingActivityList)
    })
  },
  methods: {
    getCurrentList (i) {
      this.TabCur = i
    },
    toActivityInfo (id) {
      console.log('No navigator yet')
      // const pagePath = ['Ongoing', 'Auditing', 'Finished']
      // const index = this.PageCur
      // /* global uni:false */
      // uni.navigateTo({
      //   url: '/pages/Course/' + pagePath[index] + 'Course?id=' + id,
      //   fail: function () {
      //     console.log('fail to navigate to ' + '/pages/Course/' + pagePath[index] + 'Course?id=' + id)
      //   },
      //   success: function () {
      //     console.log('succeed to navigate to ' + '/pages/Course/' + pagePath[index] + 'Course?id=' + id)
      //   }
      // })
    }
  }
}
</script>

<style>
</style>
