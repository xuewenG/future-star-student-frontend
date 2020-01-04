<template>
  <view>
    <view
      class="cu-list menu sm-border card-menu"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="cu-item arrow"
        @tap="toActivityInfo(item.id)"
      >
        <view
          class="cu-avatar round xl"
          :style="'background-image:url('+item.img+');'"
        />
        <view class="content flex-sub">
          <view v-text="item.name" />
          <view
            v-if="sub !== null"
            class="text-gray text-sm flex justify-between"
            v-text="item.intro"
          >
            暂无更多信息
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
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
