<template>
  <view>
    <view class="cu-list menu-avatar no-padding">
      <view
        v-for="(schoolmateItem, schoolmateIndex) in schoolmateList"
        :key="schoolmateIndex"
        class="cu-item arrow"
        @tap="getSchoolmateInfo(schoolmateItem.data)"
      >
        <view
          class="cu-avatar round lg"
          :style="'background-image:url('+schoolmateItem.avatar+');'"
        />
        <view class="content">
          <view class="text-lg">
            {{ schoolmateItem.name }}
          </view>
          <view class="text-sm text-gray">
            {{ schoolmateItem.company }}{{ schoolmateItem.position }}
          </view>
          <view class="text-sm text-gray">
            {{ schoolmateItem.area }} &nbsp;|&nbsp; {{ schoolmateItem.profession }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import CourseDetailRequest from '@/request/Course/CourseDetailRequest'
export default {
  props: {
    clazzId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      schoolmateList: [
        {
          id: 1,
          avatar: '',
          name: 'Hello',
          camp: '5',
          area: '伊斯法罕',
          profession: 'CEO'
        }
      ]
    }
  },
  mounted () {
    CourseDetailRequest.getCourseClassmateList(this.clazzId).then(r => {
      this.schoolmateList = r
    })
  },
  methods: {
    getSchoolmateInfo (schoolmate) {
      /* global uni:false */
      uni.navigateTo({
        url: '/pages/Schoolmate/SchoolmateInfo?schoolmate=' + encodeURIComponent(JSON.stringify(schoolmate)),
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>
