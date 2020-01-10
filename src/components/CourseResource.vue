<template>
  <view>
    <!-- <uni-collapse
      v-for="(item,index) in courseResourceList"
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
    </uni-collapse> -->
    <van-collapse
      :value="classCollapse"
      @change="classChange"
    >
      <van-collapse-item
        v-for="(courseItem, courseItemIndex) in courseItemList"
        :key="courseItemIndex"
        :title="courseItem.content_name"
      >
        <!-- <view class="cu-bar bg-white">
          <view class="action">
            <text class="cuIcon-titles text-green" /> 课程列表
          </view>
        </view> -->
        <view class="cu-list menu">
          <view
            v-for="(resourceItem, resourceIndex) in courseItem.resources"
            :key="resourceIndex"
            class="cu-item"
          >
            <button
              class="cu-btn content"
              :disabled="resourceItem.state===STATE.RESOURCE.CLOSED"
              @tap="test()"
            >
              <text
                class="text-black"
                :class="resourceType[resourceItem.type].icon"
              />
              <text class="text-black">
                {{ resourceType[resourceItem.type].name }}
              </text>
            </button>
          </view>

          <!-- <view class="cu-item">
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
          </view> -->
        </view>
      </van-collapse-item>
    </van-collapse>
  </view>
</template>

<script>
import CourseDetailRequest from '@/request/Course/CourseRequestDetail'
import STATE from '@/request/constant'
export default {
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      classCollapse: ['1'],
      resourceType: [
        {
          icon: 'cuIcon-write',
          name: '速记'
        }, {
          icon: 'cuIcon-text',
          name: '课件'
        }, {
          icon: 'cuIcon-video',
          name: '视频'
        }
      ],
      courseItemList: [
        {
          title: '第一次开课'
        }, {
          title: '第二次开课'
        }, {
          title: '第三次开课'
        }
      ]
    }
  },
  mounted () {
    CourseDetailRequest.getCourseItemList(this.courseId).then(r => {
      this.courseItemList = r
      console.log(this.courseItemList)
    })
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
      // console.log(e.detail)
    },
    test (courseItem) {
      console.log(courseItem)
    }
  }
}
</script>

<style>

</style>
