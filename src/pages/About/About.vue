<template>
  <view>
    <view
      class="cu-list menu sm-border card-menu"
    >
      <view
        class="margin-sm text-sm text-gray content"
      >
        个人资料
      </view>
      <view
        class="cu-item arrow margin-top"
        @tap="navigateToAboutInfo(id)"
      >
        <view
          class="cu-avatar round lg"
          :style="'background-image:url('+aboutItem.img+');'"
        />
        <view class="margin-left content flex-sub">
          <view v-text="aboutItem.name" />
          <view
            v-if="sub !== null"
            class="text-gray text-sm flex justify-between"
            v-text="aboutItem.intro"
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
  data () {
    return {
      aboutItem: {
        id: 0,
        img: '/static/EdStarsLogo.png',
        name: '俞昊然',
        intro: ''
      }
    }
  },
  methods: {
    navigateToAboutInfo (id) {
      const url = '/pages/About/PersonalInfo'
      /* global uni:false */
      uni.navigateTo({
        url: url + '?id=' + id,
        fail: function () {
          console.log('fail to navigate to ' + url)
        },
        success: function () {
          console.log('succeed to navigate to ' + url)
        }
      })
    }
  }
}
</script>

<style>
</style>
