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
    </scroll-view>
  </view>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    TopNav,
    ItemList
  },
  data () {
    return {
      TabCur: 0,
      navigatorList: ['正在进行', '审核中', '往期课程'],
      currentList: [{ id: 0, img: '/static/logo.png', name: '没刷新啊' }],
      courseItemList: [
        [{
          id: 0,
          img: '/static/logo.png',
          name: '正在进行的课程一',
          intro: '',
          url: '@/pages/Course/OngoingCourse'
        }, {
          id: 1,
          img: '/static/logo.png',
          name: '正在进行的课程二',
          intro: '',
          url: '@/pages/Course/OngoingCourse'
        }, {
          id: 2,
          img: '/static/logo.png',
          name: '正在进行的课程三',
          intro: '',
          url: '@/pages/Course/OngoingCourse'
        }],
        [{
          id: 3,
          img: '/static/logo.png',
          name: '正在审核的课程一',
          intro: '',
          url: '@/pages/Course/AuditingCourse'
        }, {
          id: 4,
          img: '/static/logo.png',
          name: '正在审核的课程二',
          intro: '',
          url: '@/pages/Course/AuditingCourse'
        }],
        [{
          id: 5,
          img: '/static/logo.png',
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
