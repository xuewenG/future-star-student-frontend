<template>
  <view>
    <cu-custom
      bg-color="bg-white"
      :is-back="true"
    >
      <block slot="backText">
        返回
      </block>
      <block slot="content">
        未来之星
      </block>
    </cu-custom>

    <view class="cu-bar bg-white margin-top-sm">
      <view class="action">
        <text class="cuIcon-titles text-orange" /> {{ camp.name }}
      </view>
    </view>
    <view class="cu-card case">
      <view class="cu-item shadow">
        <view class="image">
          <image
            :src="camp.swiperImg"
            class="png"
            mode="widthFix"
          />
          <view class="cu-tag bg-blue">
            招生
          </view>
        </view>
        <view class="cu-item margin">
          <view class="text-content flex-sub cuIcon-">
            <van-cell :title="camp.introduction" />
          </view>
        </view>
      </view>
    </view>

    <view
      v-for="(clazz, index) in camp.clazzList"
      :key="index"
    >
      <view class="cu-bar bg-white">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> {{ clazz.name }}
        </view>
      </view>
      <view class="cu-card case">
        <view class="cu-item shadow">
          <view class="image">
            <image
              :src="clazz.img"
              class="png"
              mode="widthFix"
            />
            <view class="cu-tag bg-blue">
              {{ clazz.name }}
            </view>
          </view>
          <view class="cu-item margin">
            <view class="text-content flex-sub cuIcon-attention">
              {{ clazz.info }}
            </view>
          </view>
          <van-collapse
            :value="classCollapse"
            accordion
            @change="classChange"
          >
            <van-collapse-item
              v-for="(course, courseIndex) in clazz.courseList"
              :key="courseIndex"
              :name="index + '-' + courseIndex"
              :title="course.name"
              :value="course.type"
            >
              <view class="cu-bar bg-white">
                <view class="action">
                  <text class="cuIcon-titles text-orange" /> 课程安排
                </view>
              </view>
              <van-cell-group>
                <van-cell
                  v-for="(module, moduleIndex) in course.moduleList"
                  :key="moduleIndex"
                  :title="module"
                />
              </van-cell-group>
              <view class="cu-bar bg-white margin-top-sm">
                <view class="action">
                  <text class="cuIcon-titles text-orange" /> 往期教师&拟邀讲师
                </view>
              </view>
              <van-cell-group>
                <van-cell
                  center
                  :icon="course.lecturer.avatar"
                  :title="course.lecturer.name + ' ' + course.lecturer.title"
                  :label="course.lecturer.introduction"
                />
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </view>
      </view>
    </view>

    <view class="padding">
      <button
        class="cu-btn bg-cyan shadow block"
        @tap="toApply"
      >
        我要报名
      </button>
    </view>
  </view>
</template>

<script>
import ApplyRequest from '@/request/Apply/ApplyRequest.js'
export default {
  name: 'CampInfo',
  data () {
    return {
      camp: {
        id: '',
        name: '',
        introduction: '',
        state: '',
        type: 'image',
        swiperImg: 'https://i.loli.net/2020/01/09/zkinxqPBwbtdvXQ.png',
        img: 'https://i.loli.net/2020/01/09/iEZpONujHL4Sc13.png',
        clazzList: [{
          courseList: [{
            moduleList: []
          }]
        }]
      },
      classCollapse: '1'
    }
  },
  mounted () {
    ApplyRequest.getCampInfo(this.camp.id).then(clazzList => {
      this.$set(this.camp, 'clazzList', clazzList)
      for (let i = 0; i < this.camp.clazzList.length; i++) {
        const clazz = this.camp.clazzList[i]
        ApplyRequest.getCourseList(clazz.id).then(courseList => {
          this.$set(this.camp.clazzList[i], 'courseList', courseList)
        }).catch(res => {
          console.log('获取课程列表失败')
        })
      }
    })
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
    },
    toApply (e) {
      console.log(e)
      /* global uni:false */
      uni.navigateTo({
        url: '../Apply/BaseInfoForm',
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  },
  onLoad: function (option) {
    this.camp = JSON.parse(decodeURIComponent(option.data))
    console.log(this.camp)
  }
}
</script>

<style>
</style>
