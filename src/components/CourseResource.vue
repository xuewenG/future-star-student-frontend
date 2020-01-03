<template>
  <view>
    <uni-collapse
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
    </uni-collapse>
  </view>
</template>

<script>
import { uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui'
export default {
  components: {
    uniCollapse,
    uniCollapseItem
  },
  props: {
    courseResourceList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
