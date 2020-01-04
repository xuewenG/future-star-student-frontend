<template>
  <view class="flex text-center top-bar bg-white nav">
    <view
      v-for="(item,index) in navList"
      :key="index"
      class="nav-tap cu-item flex-sub"
      :class="index==TabCur?'text-green cur':''"
      :data-id="index"
      @tap="tabSelect"
    >
      {{ item }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      TabCur: 0
      // scrollLeft: 0
    }
  },
  methods: {
    tabSelect (e) {
      this.TabCur = parseInt(e.currentTarget.dataset.id)
      // this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      // this.getCurrentList(e.currentTarget.dataset.id)
      this.$emit('cur-changed', e.currentTarget.dataset.id)
    }
  }
}
</script>

<style>
</style>
