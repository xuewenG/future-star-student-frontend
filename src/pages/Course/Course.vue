<template>
  <view>
    <scroll-view
      scroll-x
      class="bg-white nav"
    >
      <top-nav
        :nav-list="navigatorList"
        @cur-changed="getCurrentList"
      />
      <item-list
        :list="currentList"
      />
      <view
        v-if="loadModal"
        class="cu-load load-modal"
      >
        <view class="cuIcon-emojifill text-green" />
        <!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
        <view class="gray-text">
          加载中...
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import ItemList from '@/components/ItemList.vue'
import CourseRequest from '@/request/Course/CourseRequest'
export default {
  components: {
    TopNav,
    ItemList
  },
  data () {
    return {
      TabCur: 0,
      loadModal: false,
      navigatorList: ['正在进行', '审核中', '往期课程'],
      currentList: [/* { id: 0, img: '/static/logo.png', name: '没刷新啊' } */],
      courseItemList: [
        [{
          id: 0,
          img: '/static/EdStarsLogo.png',
          name: '正在进行的课程一',
          intro: '',
          url: '/pages/Course/OngoingCourse'
        }, {
          id: 1,
          img: '/static/EdStarsLogo.png',
          name: '正在进行的课程二',
          intro: '',
          url: '/pages/Course/OngoingCourse'
        }, {
          id: 2,
          img: '/static/EdStarsLogo.png',
          name: '正在进行的课程三',
          intro: '',
          url: '/pages/Course/OngoingCourse'
        }],
        [{
          id: 3,
          img: '/static/EdStarsLogo.png',
          name: '正在审核的课程一',
          intro: '',
          url: '/pages/Course/AuditingCourse'
        }, {
          id: 4,
          img: '/static/EdStarsLogo.png',
          name: '正在审核的课程二',
          intro: '',
          url: '/pages/Course/AuditingCourse'
        }],
        [{
          id: 5,
          img: '/static/EdStarsLogo.png',
          name: '已经结束的课程一',
          intro: '',
          url: '/pages/Course/FinishedCourse'
        }]
      ]
    }
  },
  mounted () {
    this.loadModal = true
    CourseRequest.getOngoingCourseList(1).then(r => {
      this.courseItemList[0] = r
      this.getCurrentList(0)
      this.loadModal = false
    })
    CourseRequest.getAuditingCourseList(1).then(r => {
      this.courseItemList[1] = r
    })
    CourseRequest.getFinishedCourseList(1).then(r => {
      this.courseItemList[2] = r
    })
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
