<template>
  <view>
    <view>
      <item-list
        :list="finishedActivityList"
      />
    </view>
    <loading-modal :display="loadModal" />
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import ActivityRequest from '@/request/Activity/ActivityRequest.js'
export default {
  components: {
    ItemList
  },
  props: {
    topNav: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      CustomBar: this.CustomBar,
      loadModal: false,
      finishedActivityList: [
      // {
      //   id: 7,
      //   name: '往期活动1',
      //   img: '/static/EdStarsLogo.png',
      //   intro: '2019年12月11日',
      //   url: '/pages/Activity/ActivityInfo'
      // }, {
      //   id: 8,
      //   name: '往期活动2',
      //   img: '/static/EdStarsLogo.png',
      //   intro: '2019年6月8日',
      //   url: '/pages/Activity/ActivityInfo'
      // }, {
      //   id: 9,
      //   name: '往期活动3',
      //   img: '/static/EdStarsLogo.png',
      //   intro: '2019年3月25日',
      //   url: '/pages/Activity/ActivityInfo'
      // }
      ]
    }
  },
  mounted () {
    this.loadModal = true
    ActivityRequest.getFinishedActivityList().then(r => {
      this.finishedActivityList = r
      this.loadModal = false
      // console.log(this.finishedActivityList)
    })
  }
}
</script>

<style>
</style>
