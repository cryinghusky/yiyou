<template>
	<view class="">
		<view class="u-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="w100 flex justify-center" :style="[navbarInnerStyle]">
			<view class="p24">
				释放刷新
			</view>
		</view>
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
		
		data() {
			return {
				menuButtonInfo: menuButtonInfo,
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		computed:{
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
				console.log(style);
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
	
</style>
