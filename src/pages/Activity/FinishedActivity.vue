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
        >
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round">
          搜索
        </button>
      </view>
    </view>
    <view
      :style="[{marginTop: topNav+16+'px'}]"
    >
      <item-list
        :list="finishedActivityList"
      />
    </view>
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    ItemList
  },
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
        id: 555,
        name: '往期活动1',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年12月11日',
        url: '@/pages/Activity/ActivityInfo'
      }, {
        id: 666,
        name: '往期活动2',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年6月8日',
        url: '@/pages/Activity/ActivityInfo'
      }, {
        id: 777,
        name: '往期活动3',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年3月25日',
        url: '@/pages/Activity/ActivityInfo'
      }
      ]
    }
  }
}
</script>

<style>
</style>
