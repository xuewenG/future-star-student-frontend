<template>
  <view>
    <view
      class="text-content padding bg-white"
      v-text="auditState"
    />
    <button
      data-target="Modal"
      @tap="showModal"
    >
      查看评价
    </button>
    <view
      class="cu-modal"
      :class="modalName=='Modal'?'show':''"
    >
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">
            评价信息
          </view>
          <view
            class="action"
            @tap="hideModal"
          >
            <text class="cuIcon-close text-red" />
          </view>
        </view>
        <view class="padding-xl">
          暂无评价
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      auditState: '您已通过初审，请等待电话面试通知',
      modalName: null
    }
  },
  methods: {
    showModal (e) {
      this.modalName = e.currentTarget.dataset.target
    },
    hideModal (e) {
      this.modalName = null
    }
  }
}
</script>

<style>
</style>
