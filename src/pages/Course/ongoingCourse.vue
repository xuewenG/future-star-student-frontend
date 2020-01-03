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
      :course-resource-list="courseItemList"
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
      },
      courseItemList: [{
        title: '第一次开课'
      }, {
        title: '第二次开课'
      }, {
        title: '第三次开课'
      }
      ]
    }
  },
  onLoad (option) {
    console.log(option.id)
  }
}
</script>

<style>
</style>
