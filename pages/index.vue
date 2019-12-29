<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">未来之星</block>
		</cu-custom>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view v-for="(icon, index) in iconList" :key="index" class="action" @click="NavChange" :data-cur="icon.english">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/' + icon.english + [PageCur===icon.english?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur===icon.english?'text-green':'text-gray'">{{icon.chinese}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'apply',
				iconList: [
					{
						english: 'apply',
						chinese: '报名',
					}, {
						english: 'course',
						chinese: '班课',
					}, {
						english: 'schoolmate',
						chinese: '校友',
					}, {
						english: 'activity',
						chinese: '活动',
					}, {
						english: 'about',
						chinese: '我的',
					}
				]
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>
</style>
