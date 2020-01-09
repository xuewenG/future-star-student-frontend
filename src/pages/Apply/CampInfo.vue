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
        <text class="cuIcon-titles text-orange" /> 未来之星创新院xxx期招生中
      </view>
    </view>
    <view class="cu-card case">
      <view class="cu-item shadow">
        <view class="image">
          <image
            src="../../static/EdStarsApply.png"
            class="png"
            mode="widthFix"
          />
          <view class="cu-tag bg-blue">
            招生
          </view>
        </view>
        <view class="cu-item margin">
          <view class="text-content flex-sub">
            <!-- <view v-html="camp.campInfo" /> -->
          </view>
        </view>
      </view>
    </view>

    <view
      v-for="(clazz, index) in camp.classList"
      :key="index"
    >
      <view class="cu-bar bg-white">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> {{ clazz.className }}
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
              {{ clazz.className }}
            </view>
          </view>
          <view class="cu-item margin">
            <view class="text-content flex-sub">
              <!-- <view v-html="clazz.classInfo" /> -->
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
              :title="course.courseName"
              :value="course.courseType"
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
                  :title="moduleIndex+1 + '.' + module"
                />
              </van-cell-group>
              <view class="cu-bar bg-white margin-top-sm">
                <view class="action">
                  <text class="cuIcon-titles text-orange" /> 往期教师&拟邀讲师
                </view>
              </view>
              <van-cell-group>
                <van-cell
                  v-for="(lecturer, lecturerIndex) in course.lecturerList"
                  :key="lecturerIndex"
                  :icon="lecturer.avatar"
                  :title="lecturer.lecturerName + ' ' + lecturer.title"
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
export default {
  name: 'CampInfo',
  data () {
    return {
      camp: {
        campId: '',
        campObject: '',
        campInfo: '关于未来之星创新院<br>招生及报名<br>招生对象<br>申请介绍<br>',
        campState: '',
        classList: [
          {
            campId: '',
            className: '素质教育专题班',
            classInfo: '<h3>未来之星创新院——素质教育专题班”，为素质教育人量身打造的训练营，期待你的加入！</h3>' +
              '<p>素质教育专题班”有幸邀请到三位在素质教育领域有着丰富经验和深刻理解的专家顾问，他们将在课程内容设计上基于素质行业特点给予专业指导，为同学们带来专业、实用的专题课程</p>',
            applyStart: '2019-09-01',
            applyEnd: '2019-10-01',
            enrollment: 50,
            curEnroll: 20,
            img: '../../static/EdStarsQualityClass.png',
            courseList: [
              {
                classId: '',
                courseName: '初心课',
                courseType: '大院通识课',
                courseInfo: '结合课堂讲授、游学参访、小组学习、沙盘、沙龙等多种学习方式，为素质教育创业者带来全方位的助力，全面提升创始人的认知',
                courseStart: '2019-07-01',
                courseEnd: '2019-07-03',
                courseSpot: '北京',
                moduleList: [
                  '了解前沿技术发展，探讨未来技术与教育的具体结合',
                  '了解经济发展，消费升级给行业发展带来的机遇和挑战'
                ],
                lecturerList: [
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '李善友',
                    title: '混沌大学创始人',
                    briefInfo: '李善友是混沌大学创始人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '卫哲',
                    title: '嘉御基金创始人',
                    briefInfo: '卫哲是嘉御基金创始人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '李朝晖',
                    title: '腾讯投资管理合伙人',
                    briefInfo: '李朝晖是腾讯投资管理合伙人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '黄谭',
                    title: '好未来首席技术官',
                    briefInfo: '黄谭是好未来首席技术官',
                    tel: ''
                  }
                ]
              },

              {
                classId: '',
                courseName: '创业课',
                courseType: '小班专业课',
                courseInfo: '创业课模块，紧贴细分赛道、解决实际业务问题',
                courseStart: '2019-09-01',
                courseEnd: '2019-09-03',
                courseSpot: '北京',
                moduleList: [],
                lecturerList: []
              },
              {
                classId: '',
                courseName: '未来课',
                courseType: '大院通识课',
                courseInfo: '结合课堂讲授、游学参访、小组学习、沙盘、沙龙等多种学习方式，为素质教育创业者带来全方位的助力，全面提升创始人的认知',
                courseStart: '2019-11-01',
                courseEnd: '2019-11-03',
                courseSpot: '北京',
                moduleist: [],
                lecturerList: []
              }
            ]
          },

          {
            campId: '',
            className: '教育信息化专题班',
            classInfo: '<h3>未来之星创新院——教育信息化专题班，为素质教育人量身打造的训练营，期待你的加入！</h3>',
            applyStart: '2019-09-01',
            applyEnd: '2019-10-01',
            enrollment: 50,
            curEnroll: 20,
            img: '../../static/EdStarsEducationClass.png',
            courseList: [
              {
                classId: '',
                courseName: '初心课',
                courseType: '大院通识课',
                courseInfo: '结合课堂讲授、游学参访、小组学习、沙盘、沙龙等多种学习方式，为素质教育创业者带来全方位的助力，全面提升创始人的认知',
                courseStart: '2019-07-01',
                courseEnd: '2019-07-03',
                courseSpot: '北京',
                moduleist: [
                  '了解前沿技术发展，探讨未来技术与教育的具体结合',
                  '了解经济发展，消费升级给行业发展带来的机遇和挑战'
                ],
                lecturerList: [
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '李善友',
                    title: '混沌大学创始人',
                    briefInfo: '李善友是混沌大学创始人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '卫哲',
                    title: '嘉御基金创始人',
                    briefInfo: '卫哲是嘉御基金创始人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '李朝晖',
                    title: '腾讯投资管理合伙人',
                    briefInfo: '李朝晖是腾讯投资管理合伙人',
                    tel: ''
                  },
                  {
                    lecturerId: '',
                    avatar: '/static/EdStarsLogo.png',
                    lecturerName: '黄谭',
                    title: '好未来首席技术官',
                    briefInfo: '黄谭是好未来首席技术官',
                    tel: ''
                  }
                ]
              },
              {
                classId: '',
                courseName: '创业课',
                courseType: '小班专业课',
                courseStart: '',
                courseSpot: '',
                courseEnd: '',
                moduleist: [],
                lecturerList: []
              },
              {
                classId: '',
                courseName: '未来课',
                courseType: '大院通识课',
                courseStart: '',
                courseSpot: '',
                courseEnd: '',
                moduleist: [],
                lecturerList: []
              }
            ]
          }
        ]
      },
      classCollapse: '1'
    }
  },
  methods: {
    classChange (e) {
      this.classCollapse = e.detail
      console.log(e.detail)
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
    console.log(option.campId)
  }
}
</script>

<style>
</style>
