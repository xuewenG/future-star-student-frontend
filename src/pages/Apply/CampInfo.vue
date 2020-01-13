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
          <view class="margin action flex">
            <text class="cuIcon-attentionfill text-grey lg" />
            <view class="title margin-left-sm">
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

    <view class="padding-sm">
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
              <text class="cuIcon-post text-cyan margin-left" />
              <text class="title">
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
                  :value="clazz.id"
                />
                <view class="flex-sub margin-left">{{ clazz.name }}</view>
              </label>
            </view>
          </view>
        </radio-group>
      </form>

      <button
        class="cu-btn bg-cyan shadow block margin"
        @tap="toApply"
      >
        我要报名
      </button>
    </view>
  </view>
</template>

<script>
import ApplyRequest from '@/request/Apply/ApplyRequest.js'
import STATE from '@/request/constant'
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
      clazzApply: '',
      clazzApplyState: '',
      toastTitle: ['您已通过初筛，请等待电话面试通知', '您未通过录取', '您已被录取，请线下缴费', '您已成功毕业']
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
      console.log(e.detail.value)
      this.clazzApply = e.detail.value
      console.log('当前被选中：', this.clazzApply)
    },
    toApply (e) {
      if (!this.checkClazz(this.clazzApply)) {
        return
      }
      ApplyRequest.getClazzApplyState(this.clazzApply, uni.getStorageSync('student_id')).then(state => {
        if (state === STATE.AUDIT.NOT_APPLY) {
          console.log(state)
          /* global uni:false */
          uni.navigateTo({
            url: '../Apply/BaseInfoForm?clazz=' + this.clazzApply,
            fail: (res) => {
              console.log(res)
            },
            success: (res) => {
              console.log(res)
            }
          })
        } else {
          uni.showToast({
            title: this.toastTitle[state],
            icon: 'none',
            duration: 3000
          })
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
