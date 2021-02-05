<template>
	<view>
		<button class="bottom" @click="getJDGoods()">获取京东数据</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			//获取用户数据
			getJDGoods(){
				this.$request('jd/jingfenQuery', {}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
