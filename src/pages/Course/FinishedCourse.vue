<template>
  <view>
    <title-bar title="课程信息" />
    <top-nav
      :nav-list="navigatorList"
      @cur-changed="(cur)=>{pageCur=cur}"
    />
    <course-info
      v-if="pageCur===0"
      :course-data="courseData"
    />
    <course-resource
      v-if="pageCur===1"
    />
  </view>
</template>
<script>
import TitleBar from '@/components/TitleBar.vue'
import TopNav from '@/components/TopNav.vue'
import CourseInfo from '@/components/CourseInfo.vue'
import CourseResource from '@/components/CourseResource.vue'
export default {
  components: {
    TopNav,
    TitleBar,
    CourseInfo,
    CourseResource
  },
  data () {
    return {
      pageCur: 0,
      navigatorList: ['课程介绍', '课程资料', '同学列表'],
      courseData: {
        time: '2020年1月1日——2020年2月15日',
        place: '霸都飞禽繁育与生态研究中心',
        intro: '这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课',
        teacher: {
          name: '鸽老师',
          avatar: '/static/tabbar/apply.png',
          title: '2019年金鸽杯全国鸽手大赛“最佳鸽王”',
          contact: 'Coo@666.com'
        }
      }
    }
  },
  onLoad (option) {
    this.courseData = JSON.parse(decodeURIComponent(option.data))
    console.log(this.courseData)
  }
}
</script>

<style>
</style>
