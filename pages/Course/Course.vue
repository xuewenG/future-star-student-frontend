<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" 
				:class="index==TabCur?'text-green cur':''" 
				v-for="(item,index) in navigatorList" :key="index" 
				@tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				navigatorList: ["正在进行", "审核中", "往期课程"]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
 		}
	}
</script>

<style>
</style>
