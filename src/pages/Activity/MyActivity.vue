<template>
  <view>
    <!-- <uni-collapse
      :accordion="true"
    >
      <uni-collapse-item
        :open="true"
        :show-animation="true"
        title="正在进行"
      >
        <item-list
          :list="ongoingActivityList"
        />
      </uni-collapse-item>

      <uni-collapse-item
        :show-animation="true"
        title="已经结束"
      >
        <item-list
          :list="finishedActivityList"
        />
      </uni-collapse-item>
    </uni-collapse> -->
    <van-collapse
      :value="classCollapse"
      :accordion="false"
      @change="classChange"
    >
      <van-collapse-item
        title="已报名"
      >
        <item-list
          :list="enrollingActivityList"
        />
      </van-collapse-item>
      <van-collapse-item
        title="正在进行"
      >
        <item-list
          :list="ongoingActivityList"
        />
      </van-collapse-item>
      <van-collapse-item
        title="已结束"
      >
        <item-list
          :list="finishedActivityList"
        />
      </van-collapse-item>
    </van-collapse>
    <loading-modal :display="loadModal" />
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import ActivityRequest from '@/request/Activity/ActivityRequest'
export default {
  components: {
    ItemList
  },
  data () {
    return {
      loadModal: false,
      classCollapse: ['1'],
      enrollingActivityList: [

      ],
      ongoingActivityList: [
        // {
        //   id: 1,
        //   img: '/static/EdStarsLogo.png',
        //   name: '正在进行的校友活动1',
        //   intro: '正在进行',
        //   url: '/pages/Activity/ActivityInfo'
        // }, {
        //   id: 2,
        //   img: '/static/EdStarsLogo.png',
        //   name: '正在进行的校友活动2',
        //   intro: '正在进行',
        //   url: '/pages/Activity/ActivityInfo'
        // }, {
        //   id: 3,
        //   img: '/static/EdStarsLogo.png',
        //   name: '正在进行的校友活动3',
        //   intro: '正在进行',
        //   url: '/pages/Activity/ActivityInfo'
        // }
      ],
      finishedActivityList: [
        // {
        //   id: 7,
        //   img: '/static/EdStarsLogo.png',
        //   name: '已经结束的校友活动1',
        //   intro: '已经结束',
        //   url: '/pages/Activity/ActivityInfo'
        // }, {
        //   id: 8,
        //   img: '/static/EdStarsLogo.png',
        //   name: '已经结束的校友活动2',
        //   intro: '已经结束',
        //   url: '/pages/Activity/ActivityInfo'
        // }, {
        //   id: 9,
        //   img: '/static/EdStarsLogo.png',
        //   name: '已经结束的校友活动3',
        //   intro: '已经结束',
        //   url: '/pages/Activity/ActivityInfo'
        // }
      ]
    }
  },
  mounted () {
    this.loadModal = true
    const UserId = uni.getStorageSync('student_id')
    ActivityRequest.getMyEnrollingActivityList(UserId).then(r => {
      this.enrollingActivityList = r
      // console.log(this.enrollingActivityList)
    }).then(() => {
      ActivityRequest.getMyOngoingActivityList(UserId).then(r => {
        this.ongoingActivityList = r
        // console.log(this.ongoingActivityList)
      })
    }).then(() => {
      ActivityRequest.getMyFinishedActivityList(UserId).then(r => {
        this.finishedActivityList = r
        // console.log(this.finishedActivityList)
      })
    }).then(() => {
      this.loadModal = false
    })
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
      // console.log(e.detail)
    }
  }
}
</script>

<style>
</style>
