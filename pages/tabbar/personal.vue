<template>
	<view>
		<view class="flex center w100 p24 bg_linear" style="height: 200rpx;">
			<image :src="userInfo.avatar" mode="" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image>
			<view class="ml-20 cffff" v-if="userInfo">
				{{userInfo.nickname}}
			</view>
		</view>
		<view>
			<button
				class="bottom"
				type="primary"
				open-type="getUserInfo"
				withCredentials="true"
				lang="zh_CN"
				@getuserinfo="wxGetUserInfo"
			>微信用户一键登录</button>
			<button class="bottom" @click="getUserInfo()">获取用户数据</button>
		</view>
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
			this.login();
		},
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			}
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
							uni.setStorageSync('storage_key', res.token);
							_this.getUserInfo();
						})
					},
					fail: function (e) {
						console.log(e);
					}
				});
			},
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo () {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function (infoRes) {
						console.log(infoRes);
						_this.$request('user/updateUser', {
							infoRes: infoRes,
						}).then(res => {
							console.log(res);
							
						})
					},
					fail (res) { }
				});
			},
			//获取用户数据
			getUserInfo(){
				this.$store.dispatch('getUserInfo');
			}
		}
	}
</script>

<style lang="scss">

</style>
