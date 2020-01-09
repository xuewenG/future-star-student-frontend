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
      <!-- <item-list
        :list="currentList"
      /> -->

      <van-collapse
        :value="classCollapse"
        :accordion="false"
        @change="classChange"
      >
        <van-collapse-item
          v-for="(clazz, clazzIndex) in currentList"
          :key="clazzIndex"
          :title="clazz.name"
        >
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="cuIcon-titles text-green" /> 课程列表
            </view>
          </view>
          <van-cell-group>
            <van-cell
              v-for="(course, courseIndex) in clazz.courseList"
              :key="courseIndex"
              :icon="course.avatar"
              :title="course.name"
            />
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>

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
import CourseRequest from '@/request/Course/CourseRequest'
export default {
  components: {
    TopNav
  },
  data () {
    return {
      TabCur: 0,
      loadModal: false,
      classCollapse: ['1'],
      navigatorList: ['正在进行', '审核中', '往期课程'],
      currentList: [/* { id: 0, img: '/static/logo.png', name: '没刷新啊' } */],
      courseItemList: [],
      courseList: [
        {
          name: '???',
          avatar: '/static/EdStarsLogo.png'
        }
      ]
    }
  },
  mounted () {
    this.loadModal = true
    CourseRequest.getOngoingClassList(1).then(r => {
      this.courseItemList[0] = r
      for (let i = 0; i < this.courseItemList[0].length; i++) {
        CourseRequest.getCourseList(this.courseItemList[0][i].id, 'OngoingCourse').then(r => {
          this.courseItemList[0][i].courseList = r
        })
      }
      this.getCurrentList(0)
      this.loadModal = false
    })
    CourseRequest.getAuditingClassList(1).then(r => {
      this.courseItemList[1] = r
      for (let i = 0; i < this.courseItemList[1].length; i++) {
        CourseRequest.getCourseList(this.courseItemList[1][i].id, 'AuditingCourse').then(r => {
          this.courseItemList[1][i].courseList = r
        })
      }
    })
    CourseRequest.getFinishedClassList(1).then(r => {
      this.courseItemList[2] = r
      for (let i = 0; i < this.courseItemList[2].length; i++) {
        CourseRequest.getCourseList(this.courseItemList[2][i].id, 'FinishedCourse').then(r => {
          this.courseItemList[2][i].courseList = r
        })
      }
    })
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
      // console.log(e.detail)
    },
    getCurrentList (i) {
      this.PageCur = i
      this.currentList = this.courseItemList[i]
    }
  }
}
</script>

<style>
</style>
