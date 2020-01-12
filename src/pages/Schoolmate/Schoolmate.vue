<template>
  <view>
    <view
      class="content fixed"
      :style="[{top:customBar + 'px'}]"
    >
      <view
        class="cu-bar bg-white search"
      >
        <view class="search-form round">
          <text class="cuIcon-search" />
          <input
            v-model="searchWord"
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
        :menu-list="menuList"
        @result="result"
      />
    </view>
    <SchoolmateList
      ref="schoolmateList"
      :init-option="conditions"
      :search-bar="searchBar"
    />
  </view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue'
import SchoolmateList from '../../components/SchoolmateList.vue'
import SchoolmateRequest from '@/request/Schoolmate/SchoolmateRequest.js'
export default {
  components: {
    slFilter,
    SchoolmateList
  },
  data () {
    return {
      menuList: [{
        title: '届别',
        detailTitle: '请选择校友学期(单选)',
        isMutiple: false,
        key: 'camp',
        detailList: []
      }, {
        title: '地区',
        detailTitle: '请选择校友地区(可多选)',
        isMutiple: false,
        key: 'city',
        detailList: [
          {
            title: '不限',
            value: ''
          },
          {
            title: '北京',
            value: '北京'
          },
          {
            title: '上海',
            value: '上海'
          },
          {
            title: '广州',
            value: '广州'
          },
          {
            title: '深圳',
            value: '深圳'
          }
        ]
      }, {
        title: '行业',
        detailTitle: '请选择校友行业(单选)',
        isMutiple: false,
        key: 'profession',
        detailList: [
          {
            title: '不限',
            value: ''
          },
          {
            title: '素质教育类',
            value: '素质教育类'
          },
          {
            title: '教育信息化类',
            value: '教育信息化类'
          },
          {
            title: '教育技术类',
            value: '教育技术类'
          },
          {
            title: '学科教育类',
            value: '学科教育类'
          },
          {
            title: '幼小教育类',
            value: '幼小教育类'
          }
        ]
      }],
      searchWord: '',
      schoolmateList: [],
      customBar: this.CustomBar,
      searchBar: '',
      selectBar: '',
      titleColor: '#ffffff',
      themeColor: '#39b54a',
      conditions: {
        camp: '',
        name: '',
        city: '',
        profession: ''
      }
    }
  },
  mounted () {
    SchoolmateRequest.getCampList().then(campList => {
      campList.splice(0, 0, { title: '不限', value: '' })
      console.log(campList)
      this.$set(this.menuList[0], 'detailList', campList)
    })
  },
  onReady () {
    const that = this
    uni.createSelectorQuery().in(this).select('.cu-bar').boundingClientRect(function (res) {
      that.searchBar = res.height
    }).exec()
  },
  methods: {
    setConditions (e) {
      console.log('setConditions', e.detail.value)
      this.conditions.name = this.searchWord
      this.updateSchoolmateList()
    },
    result (val) {
      this.conditions.camp = val.camp
      this.conditions.city = val.city
      this.conditions.profession = val.profession
      this.updateSchoolmateList()
    },
    updateSchoolmateList () {
      console.log('update in Schoomate', this.conditions)
      this.$refs.schoolmateList.updateOption(this.conditions)
    }
  }
}
</script>

<style>
</style>
