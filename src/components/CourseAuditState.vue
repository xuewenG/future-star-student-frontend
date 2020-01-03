<template>
  <view>
    <view
      class="text-content padding bg-white"
      v-text="auditState"
    />
  </view>
</template>

<script>
export default {
  data () {
    return {
      auditState: '您已通过初审，请等待电话面试通知'
    }
  }
}
</script>

<style>
</style>
