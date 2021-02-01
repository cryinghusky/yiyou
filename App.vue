<script>

export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function(res) {
		let _this = this;
		console.log('App Show')
		if (res && res.shareTicket) {
			const shareTicket = res.shareTicket
			wx.getShareInfo({
				shareTicket: shareTicket, success(res) {
					_this.encryptedData = res.encryptedData;
					_this.iv = res.iv;
				}
			})
		}
		//用户登陆
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				_this.code = loginRes.code;
				console.log("code: " + _this.code);
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						params:{
							code:_this.code
						},
						action:'code2SessionWeixin'
					},
					success(res){
						console.log(res);
						if (_this.iv) {
							uniCloud.callFunction({
								name: 'getShareInfo',
								data: {
									iv:_this.iv,
									encryptedData:_this.encryptedData,
									sessionKey:res.result.sessionKey
								},
								success(res1){
									console.log(res1);
									
								},
								fail(err1){
								   console.log(err1);
								}
							})
						}
						
					},
					fail(err){
					   console.log(err);
					}
				})
			},
			fail: function (e) {
				
			}
		});
	},
	onHide: function() {
		console.log('App Hide')
	},
	methods: {
		getShareInfo(){
			
		}
	},
	data() {
		return {
			iv: '',
			encryptedData:'',	
			code:'',
		}
	},
};

</script>

<style>
	@import './common/uni.css';
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
 
</style>
