<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText" @tap="uni.navigateBack({delta:1})">返回</block>
      <block slot="content">未来之星</block>
    </cu-custom>
    <TopNav></TopNav>
  </view>
</template>
<script>
  import TopNav from '@/components/TopNav.vue'
  export default {
    components: {
      TopNav
    },
    data () {
      return {
        
      }
    },
    onLoad (option) {
      console.log(option.id)
    }
  }
</script>

<style>
</style>
