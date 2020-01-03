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
    <view v-if="pageCur===1">
      <uni-collapse
        v-for="(item,index) in courseItemList"
        :key="index"
        :accordion="true"
      >
        <uni-collapse-item
          :show-animation="true"
          :title="item.title"
        >
          <view class="cu-list menu">
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-write text-gray" />
                <text class="text-gray">
                  速记
                </text>
              </button>
            </view>
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-text text-gray" />
                <text class="text-gray">
                  课件
                </text>
              </button>
            </view>
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-video text-gray" />
                <text class="text-gray">
                  视频
                </text>
              </button>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>
<script>
import TitleBar from '@/components/TitleBar.vue'
import TopNav from '@/components/TopNav.vue'
import { uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui'
import CourseInfo from '@/components/CourseInfo.vue'
export default {
  components: {
    TopNav,
    TitleBar,
    uniCollapse,
    uniCollapseItem,
    CourseInfo
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
