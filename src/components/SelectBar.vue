<template>
  <view
    class="cu-bar bg-white search fixed"
    :style="[{top:customBar + 'px'}]"
  >
    <van-dropdown-menu>
      <van-dropdown-item
        value="value1"
        options="option1"
      />
      <van-dropdown-item
        value="value2"
        options="option2"
      />
    </van-dropdown-menu>
    <!-- <van-dropdown-menu>
      <van-dropdown-item
        :title="届别"
        :value="camp"
        :options="campOptions"
        @change="getCampOption(value)"
      />
      <van-dropdown-item
        :title="地区"
        :value="camp"
        :options="campOptions"
        @change="getCampOption(value)"
      />
      <van-dropdown-item
        :title="行业"
        :value="camp"
        :options="campOptions"
        @change="getCampOption(value)"
      />
    </van-dropdown-menu> -->
  </view>

  <!-- <dropdown-menu>
    <dropdown-item
      v-for="(searchConditions, conditionIndex) in searchList"
      :title="searchConditions.condition"
      :options="searchConditions.options"
      value="searchConditions.options[0].value"
      @change="getCondition(conditionIndex)"
    >
    </dropdown-item>
  </dropdown-menu> -->
</template>

<script>
export default {
  // props: {
  //   searchList: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
      customBar: this.CustomBar,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      value1: 0,
      value2: 'a',
      campOptions: [
        {
          text: '第一期',
          value: 0
        }, {
          text: '第二期',
          value: 1
        }, {
          text: '第三期',
          value: 2
        }
      ],
      areaOptions: [
        {
          text: '第一期',
          value: 0
        }, {
          text: '第二期',
          value: 1
        }, {
          text: '第三期',
          value: 2
        }
      ],
      professionOptions: [
        {
          text: '素质教育',
          value: 0
        }, {
          text: '学科教育',
          value: 1
        }, {
          text: '幼小教育',
          value: 2
        }
      ],
      camp: 0,
      area: 0,
      profession: 0,
      campOption: '',
      areaOption: '',
      professionOption: ''
    }
  },
  methods: {
    getCampOption (value) {
      this.campOption = this.campOptions.find(ele => ele.value === value).text
      console.log(this.campOption)
    },
    getAreaOption (value) {
      this.areaOption = this.areaOptions.find(ele => ele.value === value).text
      console.log(this.areaOption)
    },
    getProfessionOption (value) {
      this.professionOption = this.professionOptions.find(ele => ele.value === value).text
      console.log(this.professionOption)
    }
  }
}
</script>

<style>
</style>
