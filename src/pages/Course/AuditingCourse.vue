<template>
  <view>
    <title-bar title="课程信息" />
    <course-info
      :course-data="courseData"
    />
  </view>
</template>
<script>
import TitleBar from '@/components/TitleBar.vue'
import CourseInfo from '@/components/CourseInfo.vue'
export default {
  components: {
    TitleBar,
    CourseInfo
  },
  data () {
    return {
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
