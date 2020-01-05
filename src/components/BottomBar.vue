<template>
  <view class="cu-bar tabbar bg-white shadow foot">
    <view
      v-for="(module, index) in moduleList"
      :key="index"
      class="action"
      :data-cur="module.key"
      @click="NavChange"
    >
      <view class="cuIcon-cu-image">
        <image :src="'/static/tabbar/' + module.key + [PageCur===module.key?'_cur':''] + '.png'" />
      </view>
      <view :class="PageCur===module.key?'text-green':'text-gray'">
        {{ module.moduleName }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    moduleList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      PageCur: 'apply'
    }
  },
  methods: {
    NavChange (e) {
      this.PageCur = e.currentTarget.dataset.cur
      this.$emit('cur-changed', e.currentTarget.dataset.cur)
    }
  }
}
</script>

<style>
</style>
