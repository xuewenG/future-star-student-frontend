<template>
  <view>
    <view class="cu-list menu-avatar no-padding">
      <view
        v-for="(schoolmateItem, schoolmateIndex) in schoolmateList"
        :key="schoolmateIndex"
        class="cu-item arrow"
        @tap="getSchoolmateInfo(schoolmateItem.id)"
      >
        <view
          class="cu-avatar round lg"
          :style="'background-image:url('+schoolmateItem.avatar+');'"
        />
        <view class="content">
          <view class="text-lg">
            {{ schoolmateItem.name }}
          </view>
          <view class="text-gray">
            未来之星第{{ schoolmateItem.camp }}期校友 &nbsp;|&nbsp; {{ schoolmateItem.area }}
          </view>
          <view class="text-gray">
            {{ schoolmateItem.profession }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import CourseDetailRequest from '@/request/Course/CourseRequestDetail'
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
    console.log(this.clazzId)
    CourseDetailRequest.getCourseItemList(this.clazzId).then(r => {
      this.schoolmateList = r
    })
  },
  methods: {
    getSchoolmateInfo (id) {
      /* global uni:false */
      uni.navigateTo({
        url: '/pages/Schoolmate/SchoolmateInfo?schoolmateId=' + id,
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
