<template>
	<view>
		<image 
			:src="imgURL" 
			style="width: 702rpx;margin: 24rpx;"
			:show-menu-by-longpress='true'
			mode="widthFix"
			></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgURL:'https://api.static.huibogoulive.cn/prod/goods/pic/202102/ec2a6082-06cd-4f2c-9fdc-f2d9074ef8f5.jpeg?x-oss-process=image/resize,m_fixed,w_750'
			};
		},
		onShareAppMessage(res) {
			let _this = this;
			var pages = getCurrentPages(); // 当前页面数据
			var nowPage = pages[pages.length - 1]; // 当前页面
			var url = `/${nowPage.route}`;
			return {
				title: '便宜你，便宜友',
				imageUrl: _this.imgURL,
				path: url
			};
		},
		onShareTimeline(res) {
			let _this = this;
			var pages = getCurrentPages(); // 当前页面数据
			var nowPage = pages[pages.length - 1]; // 当前页面
			var url = `/${nowPage.route}`;
			return {
				title: '便宜你，便宜友',
				imageUrl: _this.imgURL,
				path: url
			};
		}
	}
</script>

<style lang="scss">

</style>
