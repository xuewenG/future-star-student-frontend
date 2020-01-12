<template>
  <view>
    <view
      class="cu-bar bg-white search fixed"
      :style="[{top:customBar + 'px'}]"
    >
      <view class="search-form round">
        <text class="cuIcon-search" />
        <input
          type="text"
          placeholder="输入搜索的校友名"
          confirm-type="search"
          @confirm="setConditions"
        >
      </view>
      <view class="action">
        <button
          class="cu-btn bg-gradual-green shadow-blur round"
          @tap="setConditions"
        >
          搜索
        </button>
      </view>
    </view>
    <sl-filter
      :theme-color="themeColor"
      :style="[{top:searchBar + 'px'}]"
      :menu-list="menuList"
      @result="result"
    />
  </view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue'
// import SchoolmateRequest from '@/request/Schoolmate/SchoolmateRequest.js'
export default {
  components: {
    slFilter
  },
  prop: {
    menus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      customBar: this.CustomBar,
      searchBar: '',
      selectBar: '',
      titleColor: '#ffffff',
      themeColor: '#39b54a',
      // filterResult: '',
      menuList: this.menus,
      conditions: {
        camp: '',
        name: '',
        city: '',
        profession: ''
      }
    }
  },
  created () {
    this.$emit('searchSchoolmate', this.conditions)
    this.$emit('getSearchBar', this.searchBar)
  },
  // mounted () {
  //   SchoolmateRequest.getCampList().then(campList => {
  //     console.log(campList)
  //     this.$set(this.menuList[0], 'detailList', campList)
  //   })
  // },
  onReady () {
    const that = this
    uni.createSelectorQuery().in(this).select('.cu-bar').boundingClientRect(function (res) {
      that.searchBar = res.height
    }).exec()
    // uni.createSelectorQuery().in(this).select('.content').boundingClientRect(function (res) {
    //   that.menuBar = res.height
    // }).exec()
  },
  methods: {
    setConditions (e) {
      console.log(e.detail.value)
      this.conditions.name = e.detail.value
    },
    result (val) {
      console.log('filter_result:' + JSON.stringify(val))
      const filterResult = JSON.stringify(val)
      this.conditions.camp = filterResult.camp
      this.conditions.city = filterResult.city
      this.conditions.profession = filterResult.profession
    }
  }
}
</script>

<style>
</style>
