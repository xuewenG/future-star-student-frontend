<template>
	<view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText" @tap="goBack">返回</block>
      <block slot="content" v-text="title"></block>
    </cu-custom>
	</view>
</template>

<script>
	export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      goBack () {
        /* global uni:false */
        uni.navigateBack({
          delta:1,
        })
      }
    }
	}
</script>

<style>

</style>
