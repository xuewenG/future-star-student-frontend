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
      <view class="cu-list menu">
        <view
          v-for="(item, index) in currentList"
          :key="index"
          class="cu-item arrow"
        >
          <view
            class="content"
            @tap="toCourseInfo(item.id)"
          >
            <image
              :src="item.avatar"
              class="png xl"
            />
            <text
              class="text-grey"
              v-text="item.name"
            />
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
export default {
  components: {
    TopNav
  },
  data () {
    return {
      TabCur: 0,
      navigatorList: ['正在进行', '审核中', '往期课程'],
      currentList: [{ avatar: '/static/logo.png', name: '没刷新啊' }],
      courseItemList: [
        [{
          id: 0,
          avatar: '/static/logo.png',
          name: '正在进行的课程一'
        }, {
          id: 1,
          avatar: '/static/logo.png',
          name: '正在进行的课程二'
        }, {
          id: 2,
          avatar: '/static/logo.png',
          name: '正在进行的课程三'
        }],
        [{
          id: 3,
          avatar: '/static/logo.png',
          name: '正在审核的课程一'
        }, {
          id: 4,
          avatar: '/static/logo.png',
          name: '正在审核的课程二'
        }],
        [{
          id: 5,
          avatar: '/static/logo.png',
          name: '已经结束的课程一'
        }]
      ]
    }
  },
  mounted () {
    this.getCurrentList(0)
  },
  methods: {
    getCurrentList (i) {
      this.PageCur = i
      this.currentList = this.courseItemList[i]
    },
    toCourseInfo (id) {
      const pagePath = ['Ongoing', 'Auditing', 'Finished']
      const index = this.PageCur
      /* global uni:false */
      uni.navigateTo({
        url: '/pages/Course/' + pagePath[index] + 'Course?id=' + id,
        fail: function () {
          console.log('fail to navigate to ' + '/pages/Course/' + pagePath[index] + 'Course?id=' + id)
        },
        success: function () {
          console.log('succeed to navigate to ' + '/pages/Course/' + pagePath[index] + 'Course?id=' + id)
        }
      })
    }
  }
}
</script>

<style>
</style>
