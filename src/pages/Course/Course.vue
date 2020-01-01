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
			<view class="cu-list menu">
				<view class="cu-item arrow" v-for="(item, index) in currentList" :key="index">
					<view class="content">
						<image :src="item.avatar" class="png" mode="aspectFit"></image>
						<text class="text-grey" v-text="item.name"></text>
					</view>
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
				navigatorList: ["正在进行", "审核中", "往期课程"],
				currentList: [{avatar:'/static/logo.png',name:'没刷新啊'}],
					courseItemList: [
						[{
							avatar: '/static/logo.png',
							name: '正在进行的课程一'
						},{
							avatar: '/static/logo.png',
							name: '正在进行的课程二'
						},{
							avatar: '/static/logo.png',
							name: '正在进行的课程三'
						}],
						[{
							avatar: '/static/logo.png',
							name: '正在审核的课程一'
						},{
							avatar: '/static/logo.png',
							name: '正在审核的课程二'
						}],
						[{
							avatar: '/static/logo.png',
							name: '已经结束的课程一'
						}]
					]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.getCurrentList(e.currentTarget.dataset.id)
			},
			getCurrentList (i) {
				this.currentList = this.courseItemList[i]
			}
		},
		mounted () {
			this.getCurrentList(0)
		}
	}
</script>

<style>
</style>
