<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',	
			};
		},
		onLoad() {
			//触发登陆
			this.login();
		},
		methods: {
			//登录
			login () {
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						_this.code = loginRes.code;
						console.log("code: " + _this.code);
						//通过code获得openid
						_this.$request('user/login', {
							code: _this.code,
						}).then(res => {
							console.log(res);
						})
					},
					fail: function (e) {
						console.log(e);
					}
				});
			},
		}
	}
</script>

<style lang="scss">

</style>
