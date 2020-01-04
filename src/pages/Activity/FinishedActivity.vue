<template>
  <view>
    <view
      class="cu-bar bg-white search fixed"
      :style="[{top:topNav+CustomBar+6+'px'}]"
    >
      <view class="search-form round">
        <text class="cuIcon-search" />
        <input
          type="text"
          placeholder="输入搜索的关键词"
          confirm-type="search"
        />
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round">
          搜索
        </button>
      </view>
    </view>
    <view
      class="cu-list menu sm-border card-menu"
      :style="[{marginTop: topNav+16+'px'}]"
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
  props: {
    topNav: {
      type: Number,
      required: true
    }
  },
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
