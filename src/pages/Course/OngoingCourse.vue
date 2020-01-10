<template>
  <view>
    <TitleBar title="课程信息" />
    <TopNav
      :nav-list="navigatorList"
      @cur-changed="(cur)=>{pageCur=cur}"
    />
    <course-info
      v-if="pageCur===0"
      :course-data="courseData"
    />
    <course-resource
      v-if="pageCur===1"
      :course-id="courseData.id"
    />
    <course-classmate-list
      v-if="pageCur===2"
      :clazz-id="courseData.clazz_id"
    />
  </view>
</template>
<script>
import TitleBar from '@/components/TitleBar.vue'
import TopNav from '@/components/TopNav.vue'
import CourseInfo from '@/components/CourseInfo.vue'
import CourseResource from '@/components/CourseResource.vue'
import CourseClassmateList from '@/components/CourseClassmateList.vue'
export default {
  components: {
    TopNav,
    TitleBar,
    CourseInfo,
    CourseResource,
    CourseClassmateList
  },
  data () {
    return {
      pageCur: 0,
      navigatorList: ['课程介绍', '课程资料', '同学列表'],
      courseData: {
        clazz_id: 3,
        time: '2020年1月1日——2020年2月15日',
        location: '霸都飞禽繁育与生态研究中心',
        introduction: '这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课这是一门课',
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
    console.log('courseData', this.courseData)
  }
}
</script>

<style>
</style>
