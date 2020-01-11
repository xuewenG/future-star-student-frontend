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
      <form>
        <view class="cu-bar bg-white margin-top-sm solids-bottom">
          <view class="action">
            <text class="cuIcon-titles text-orange" /> 报名班级
          </view>
        </view>
        <radio-group
          class="block"
          @change="selectClazz"
        >
          <view class="cu-bar bg-white cu-item">
            <view class="action">
              <text class="cuIcon-profile text-cyan margin-left" />
              <text class="margin-left">
                请选择报名的班级
              </text>
            </view>
          </view>
          <view class="cu-form-group cu-list menu text-left">
            <view
              v-for="(clazz, index) in camp.clazzList"
              :key="index"
              class="cu-item"
            >
              <label class="flex justify-between align-center flex-sub">
                <radio
                  class="blue radio"
                  :class="clazzApply===clazz.id?'checked':''"
                  :checked="clazzApply===clazz.id?true:false"
                  :value="clazz.id"
                />
                <view class="flex-sub margin-left">{{ clazz.name }}</view>
              </label>
            </view>
          </view>
        </radio-group>
      </form>

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
      classCollapse: '1',
      clazzApply: ''
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
    checkClazz (clazzApply) {
      if (clazzApply === null || clazzApply === '') {
        uni.showToast({
          title: '请选择报名班级',
          icon: 'none'
        })
        return false
      }
      this.clazzApply = clazzApply
      return true
    },
    selectClazz (e) {
      this.clazzApply = e.detail.value
    },
    toApply (e) {
      if (!this.checkClazz(this.clazzApply)) {
        return
      }
      console.log(e)
      console.log(this.clazzApply)
      // uni.setStorageSync('clazz_apply', this.clazzApply)
      // console.log(uni.getStorageSync('clazz_apply'))
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
