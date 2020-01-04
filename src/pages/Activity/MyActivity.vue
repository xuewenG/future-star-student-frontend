<template>
  <view>
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

          <uni-collapse accordion="true">
            <uni-collapse-item
              v-for="(course, courseIndex) in clazz.courseList"
              :key="courseIndex"
              :show-animation="true"
              :title="course.courseName + ' ' + course.courseType"
            >
              <view class="cu-bar bg-white margin-top-sm">
                <view class="action">
                  <text class="cuIcon-titles text-orange" /> 课程安排
                </view>
              </view>
              <uni-list>
                <uni-list-item
                  v-for="(module, moduleIndex) in course.moduleList"
                  :key="moduleIndex"
                  :show-arrow="false"
                  :note="moduleIndex+1 + '.' + module"
                />
              </uni-list>

              <view class="cu-bar bg-white">
                <view class="action">
                  <text class="cuIcon-titles text-orange" /> 往期教师&拟邀讲师
                </view>
              </view>
              <uni-list>
                <uni-list-item
                  v-for="(lecturer, lecturerIndex) in course.lecturerList"
                  :key="lecturerIndex"
                  :show-arrow="false"
                  :thumb="lecturer.avatar"
                  :note="lecturer.lecturerName + ' ' + lecturer.title"
                />
              </uni-list>
            </uni-collapse-item>
          </uni-collapse>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style>
</style>
