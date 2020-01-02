<template>
  <view>
    <TitleBar title="课程信息"></TitleBar>
    <TopNav :nav-list="navigatorList" @cur-changed="(cur)=>{pageCur=cur}"></TopNav>    
    <view v-if="pageCur===0">
      <cover-image src="/static/BasicsBg.png"></cover-image>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-title text-green"></text> 课程介绍
        </view>
      </view>
      <view class="text-content padding bg-white text-sm">
        时间：{{courseData.time}}<br>
        地点：{{courseData.place}}
      </view>
      <view class="text-content padding bg-white" v-text="courseData.intro">
        暂无课程介绍
      </view>
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-title text-green"></text> 讲师
        </view>
      </view>
      <view class="cu-list menu-avatar">
        <view class="cu-item">
          <view class="cu-avatar round lg" 
          :style="'background-image:url('+courseData.teacher.avatar+');'"></view>
          <view class="content flex-sub">
            <view v-text="courseData.teacher.name"></view>
            <view class="text-gray text-sm flex justify-between" v-text="courseData.teacher.title">
              暂无更多信息
            </view>
          </view>
        </view>
        <view class="cu-bar bg-white solid-bottom">
          <view class="action">
            <view class="text-sm">联系方式：</view>
            <view class="text-sm" v-text="courseData.teacher.contact"></view>
          </view>
        </view>
        <view class="text-content padding bg-white" v-text="courseData.teacher.intro">
          暂无讲师介绍
        </view>
      </view>
    </view>
    <view v-if="pageCur===1">
      <uni-collapse v-for="(item,index) in courseItemList" :accordion="true" :key="index">
        <uni-collapse-item  :show-animation="true" :title="item.title">
          <view class="cu-list menu">
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-write text-gray"></text>
                <text class="text-gray">速记</text>
              </button>
            </view>
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-text text-gray"></text>
                <text class="text-gray">课件</text>
              </button>
            </view>
            <view class="cu-item">
              <button class="cu-btn content">
                <text class="cuIcon-video text-gray"></text>
                <text class="text-gray">视频</text>
              </button>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
      <!-- <view class="text-sm text-gray">11-10-25</view>
      <view>初心课</view>
      <button class="">查看</button> -->
    </view>
  </view>
</template>
<script>
  import TitleBar from '@/components/TitleBar.vue'
  import TopNav from '@/components/TopNav.vue'
  import {uniCollapse,uniCollapseItem} from '@dcloudio/uni-ui'
  export default {
    components: {
      TopNav,
      TitleBar,
      uniCollapse,
      uniCollapseItem
    },
    data () {
      return {
        pageCur: 0,
        navigatorList: ["课程介绍", "课程资料", "同学列表"],
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
          },{
            title: '第二次开课'
          },{
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
