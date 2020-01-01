<template>
	<view class="flex text-center">
		<view class="cu-item flex-sub" 
		:class="index==TabCur?'text-green cur':''" 
		v-for="(item,index) in navList" :key="index" 
		@tap="tabSelect" :data-id="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
    props:{
      navList: {
        type: Array,
        required: true
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
        // this.getCurrentList(e.currentTarget.dataset.id)
        this.$emit('cur-changed', e.currentTarget.dataset.id, 'hi~')
      },
    }
	}
</script>

<style>

</style>
