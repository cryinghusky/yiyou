<template>
	<view>
		<view class="">
			
		</view>
		<u-navbar :is-back="false" :is-fixed="true" :border-bottom='false' :background='navbarBackground' :immersive='true'>
			<view class="slot-wrap">
				<view class="sticky-box-search" @click="navToPage(`/pages/index/search`)">
					<u-search 
						bg-color='#FFFFFF' 
						search-icon-color='#EF761A' 
						:show-action='false' 
						height='72'>
					</u-search>
				</view>
			</view>
		</u-navbar>
		<topNavbar/>
		<button class="bottom" @click="getJDGoods()">获取京东数据</button>
	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	let menuButtonInfo = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	export default {
		onPullDownRefresh() {
			setTimeout(() =>{
				uni.stopPullDownRefresh();
			},500)
		},
		data() {
			return {
				navbarBackground: {
					// backgroundColor: '#001f3f',
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, #EF3D22, #FE6835)'
				},
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		methods:{
			//获取数据
			getJDGoods(){
				this.$request('jd/jingfenQuery', {}).then(res => {
					console.log(res);
				})
			},
			// 导航栏内部盒子的样式
			navbarInnerStyle() {
				let style = {};
				// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
				style.height = this.navbarHeight + 'px';
				// // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
				// #ifdef MP
				let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
				style.marginRight = rightButtonWidth + 'px';
				// #endif
				return style;
			},
			// 转换字符数值为真正的数值
			navbarHeight() {
				// #ifdef APP-PLUS || H5
				return this.height ? this.height : 44;
				// #endif
				// #ifdef MP
				// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
				// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
				// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
				let height = systemInfo.platform == 'ios' ? 44 : 48;
				return this.height ? this.height : height;
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	//顶部导航栏
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;

		.search-wrap {
			margin: 0 20rpx;
			flex: 1;
		}
	}
	.sticky-box-search {
		padding: 0 24rpx;
		flex: 1;
	}
	
	.sticky-box-img {
		width: 114rpx;
		height: 56rpx;
		margin: 0 12rpx 0 24rpx;
	}
	.swiper-box {
		width: 702rpx;
		margin: 24rpx 24rpx 8rpx;
	
		.swiper-box-img {
			width: 32rpx;
			height: 32rpx;
		}
	}
</style>
