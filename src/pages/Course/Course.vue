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

      <!-- <van-cell-group
        v-if="TabCur===1"
      >
        <van-cell
          v-for="(clazz, clazzIndex) in courseItemList[TabCur]"
          :key="clazzIndex"
          :title="clazz.name"
          :value="clazz.state"
          @tap="ItemNavigateTo(clazzIndex, courseIndex)"
        />
      </van-cell-group> -->

      <van-collapse
        :value="classCollapse"
        :accordion="false"
        @change="classChange"
      >
        <van-collapse-item
          v-for="(clazz, clazzIndex) in courseItemList[TabCur]"
          :key="clazzIndex"
          :title="clazz.name"
        >
          <view
            v-if="TabCur===1"
            class="cu-bar bg-white"
          >
            <view class="action">
              <text
                class="cuIcon-titles"
                :class="auditState[clazz.auditingState].textClass"
              >
                审核状态：{{ auditState[clazz.auditingState].str }}
              </text>
            </view>
          </view>
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
              @tap="ItemNavigateTo(clazzIndex, courseIndex)"
            />
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
      <loading-modal :display="loadModal" />
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
      auditState: [{
        str: '待审核',
        textClass: 'text-blue'
      }, {
        str: '已拒绝',
        textClass: 'text-red'
      }, {
        str: '已通过',
        textClass: 'text-green'
      }, {
        str: '已毕业',
        textClass: 'text-green'
      }, {
        str: '未毕业',
        textClass: 'text-yellow'
      }],
      currentUserId: 1,
      TabCur: 0,
      loadModal: false,
      classCollapse: ['1'],
      navigatorList: ['正在进行', '审核中', '往期课程'],
      courseItemList: [[], [], []]
    }
  },
  mounted () {
    this.loadModal = true
    this.currentUserId = uni.getStorageSync('student_id')
    CourseRequest.getOngoingClassList(this.currentUserId).then(r => {
      this.courseItemList[0] = r
      for (let i = 0; i < this.courseItemList[0].length; i++) {
        CourseRequest.getCourseList(this.courseItemList[0][i].id, 'OngoingCourse').then(r => {
          this.courseItemList[0][i].courseList = r
        })
      }
      this.getCurrentList(0)
      this.loadModal = false
    })
    CourseRequest.getAuditingClassList(this.currentUserId).then(r => {
      this.courseItemList[1] = r
      for (let i = 0; i < this.courseItemList[1].length; i++) {
        CourseRequest.getCourseList(this.courseItemList[1][i].id, 'AuditingCourse').then(r => {
          this.courseItemList[1][i].courseList = r
        })
      }
    })
    CourseRequest.getFinishedClassList(this.currentUserId).then(r => {
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
      this.TabCur = i
    },
    ItemNavigateTo (clazzIndex, courseIndex) {
      const item = this.courseItemList[this.TabCur][clazzIndex].courseList[courseIndex]
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
