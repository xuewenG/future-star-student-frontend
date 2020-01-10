<template>
  <view
    v-if="display"
    class="cu-load load-modal"
  >
    <view class="cuIcon-emojifill text-green" />
    <view class="gray-text">
      加载中...
    </view>
  </view>
</template>
<script>
export default {
  props: {
    display: {
      type: Boolean,
      required: true
    }
  }
}
</script>
