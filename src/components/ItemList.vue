<template>
  <view>
    <view
      class="cu-list menu sm-border card-menu"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="cu-item arrow"
        @tap="ItemNavigateTo(index)"
      >
        <view
          class="cu-avatar round xl"
          :style="'background-image:url('+item.img+');'"
        />
        <view class="margin-left content flex-sub">
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
  },
  methods: {
    ItemNavigateTo (index) {
      const item = this.list[index]
      console.log(item)
      /* global uni:false */
      uni.navigateTo({
        url: item.url + '?id=' + item.id,
        fail: function () {
          console.log('fail to navigate to ' + item.url)
        },
        success: function () {
          console.log('succeed to navigate to ' + item.url)
        }
      })
    }
  },
  onLoad () {
    console.log(this.list)
  }
}
</script>

<style>
</style>
