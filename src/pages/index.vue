<template>
  <view>
    <cu-custom bg-color="bg-white">
      <block slot="content">
        未来之星
      </block>
    </cu-custom>
    <apply v-if="PageCur==='apply'" />
    <course v-if="PageCur==='course'" />
    <schoolmate v-if="PageCur==='schoolmate'" />
    <activity v-if="PageCur==='activity'" />
    <about v-if="PageCur==='about'" />
    <bottom-bar
      :module-list="moduleList"
      @cur-changed="getCurPage"
    />
  </view>
</template>

<script>
import Course from '@/pages/Course/Course.vue'
import Apply from '@/pages/Apply/Apply.vue'
import Schoolmate from '@/pages/Schoolmate/Schoolmate.vue'
import Activity from '@/pages/Activity/Activity.vue'
import About from '@/pages/About/About.vue'
import BottomBar from '@/components/BottomBar.vue'
export default {
  components: {
    Apply,
    Course,
    Schoolmate,
    Activity,
    About,
    BottomBar
  },
  data () {
    return {
      PageCur: '',
      moduleList: [
        {
          key: 'apply',
          moduleName: '报名'
        }, {
          key: 'course',
          moduleName: '班课'
        }, {
          key: 'schoolmate',
          moduleName: '校友'
        }, {
          key: 'activity',
          moduleName: '活动'
        }, {
          key: 'about',
          moduleName: '我的'
        }
      ]
    }
  },
  mounted () {
    this.getCurPage('apply')
  },
  methods: {
    getCurPage (cur) {
      this.PageCur = cur
    }
  }
}
</script>

<style>
</style>
