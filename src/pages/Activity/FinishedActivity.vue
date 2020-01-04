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
    <!-- <view
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
    </view> -->
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
      item: {
        name: '???',
        img: '',
        intro: '23333333'
      },
      CustomBar: this.CustomBar,
      finishedActivityList: [{
        id: 555,
        name: '往期活动1',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年12月11日'
      }, {
        id: 666,
        name: '往期活动2',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年6月8日'
      }, {
        id: 777,
        name: '往期活动3',
        img: '../../static/EdStarsLogo.png',
        intro: '2019年3月25日'
      }
      ]
    }
  }
}
</script>

<style>
</style>
