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
            :style="[{display:resourceItem.play?'block':'flex'}]"
          >
            <button
              class="cu-btn content"
              :disabled="isClosed(resourceItem)"
              @tap="handleCheck(courseItemIndex, resourceIndex)"
            >
              <text
                class="text-black"
                :class="resourceType[resourceItem.type].icon"
              />
              <view class="text-black">
                <text v-text="resourceType[resourceItem.type].name" />
                <text
                  class="margin-left-sm"
                  v-text="resourceItem.name"
                />
              </view>
            </button>
            <view>
              <video
                v-if="resourceItem.play"
                :src="resourceItem.url"
              />
            </view>
          </view>

          <view
            class="cu-modal bottom-modal"
            :class="modalShow?'show':''"
          >
            <view class="cu-dialog">
              <view class="cu-bar bg-white">
                <view class="action text-black">
                  课堂速记
                </view>
                <view
                  class="action text-red"
                  @tap="hideModal"
                >
                  关闭
                </view>
              </view>
              <view
                class="padding-xl"
                v-text="modalContent"
              >
                Modal 内容。
              </view>
            </view>
          </view>
        </view>
      </van-collapse-item>
    </van-collapse>
  </view>
</template>

<script>
import CourseDetailRequest from '@/request/Course/CourseDetailRequest'
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
      modalShow: false,
      modalContent: '暂无内容',
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
      let courseItemList = []
      courseItemList = r
      for (let i = 0; i < courseItemList.length; i++) {
        for (let j = 0; j < courseItemList[i].resources.length; j++) {
          // courseItemList[i].resources[j].play = false
          courseItemList[i].resources[j] = {
            content: courseItemList[i].resources[j].content,
            id: courseItemList[i].resources[j].id,
            name: courseItemList[i].resources[j].name,
            state: courseItemList[i].resources[j].state,
            type: courseItemList[i].resources[j].type,
            url: courseItemList[i].resources[j].url,
            word: courseItemList[i].resources[j].word,
            play: false
          }
        }
      }
      this.courseItemList = courseItemList
      console.log(this.courseItemList)
    })
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
      // console.log(e.detail)
    },
    isClosed (courseItem) {
      return courseItem.state === STATE.RESOURCE.CLOSED
    },
    showModal (content) {
      this.modalShow = true
      this.modalContent = content
    },
    hideModal () {
      this.modalShow = false
    },
    handleCheck (courseItemIndex, resourceIndex) {
      const res = this.courseItemList[courseItemIndex].resources[resourceIndex]
      if (this.resourceType[res.type].name === '速记') {
        this.showModal(res.word)
      } else if (this.resourceType[res.type].name === '视频') {
        this.courseItemList[courseItemIndex].resources[resourceIndex].play = !res.play
      }
    }
  }
}
</script>

<style>
.non-flex {
  display: block;
}
</style>
