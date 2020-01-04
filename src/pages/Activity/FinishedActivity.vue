<template>
  <view>
    <view
      class="cu-list menu sm-border card-menu margin-top"
    >
      <view
        v-for="(item, index) in finishedActivityList"
        :key="index"
        class="cu-item arrow"
        @tap="toActivityInfo(item.id)"
      >
      <view
        class="cu-avatar round xl"
        :style="'background-image:url('+item.url+');'"
      />
      <view class="content flex-sub">
        <view v-text="item.name" />
        <view
          class="text-gray text-sm flex justify-between"
          v-text="item.time"
        >
          暂无更多信息
        </view>
      </view>
        <!-- <view class="content">
          <avatar
            :src="item.url"
            class="png xl"
            mode="aspectFit"
          />
          <text
            class="text-grey"
            v-text="item.name"
          />
          <text
            class="text-gray text-sm flex justify-between"
            v-text="item.name"
          />
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      CustomBar: this.CustomBar,
      finishedActivityList: [{
        name: '往期活动1',
        url: '../../static/EdStarsLogo.png',
        time: '2019年12月11日'
      }, {
        name: '往期活动2',
        url: '../../static/EdStarsLogo.png',
        time: '2019年6月8日'
      }, {
        name: '往期活动3',
        url: '../../static/EdStarsLogo.png',
        time: '2019年3月25日'
      }
      ]
    }
  }
}
</script>

<style>
</style>
