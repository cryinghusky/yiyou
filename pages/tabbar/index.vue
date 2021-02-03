<template>
	<view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="btnPhoto">拍照或从相册选择一张照片</button>
		</view>
		<view style="width: 100%;padding:10px 20px;">
			<image :src="imgfile" style="width: 100%;" mode="widthFix"></image>
			<view v-if="recResults.length>0" style="width: 100%;border:1px solid #ccc;border-radius: 10px;padding:10px;">
				<view style="text-align: center;font-size: 14px;color: #999;">识别结果</view>
				<view style="text-align: center;height: 30px;line-height: 30px;">
					{{selectedName}}
				</view>
				<view v-if="searchResults">
					<view v-if="searchResults.matched" style="width: 100%;text-align: center;">{{searchResults.matched.typename}}</view>
					<view v-else style="font-size: 14px;">
						<view v-for="item,index in searchResults.similars" style="display: flex;">
							<view style="flex: 1;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-right: 20px;">{{item.keywords}}</view>
							<view>{{item.typename}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let videoAd;
	export default {
		data() {
			return {
				imgfile: "",
				recResults:[],
				selectedName:"",
				searchResults:null
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			videoAd = wx.createRewardedVideoAd({
			  adUnitId: 'adunit-6e32cb75da2f678f'
			})
			videoAd.onLoad(() => {
			  console.log('激励视频 广告加载成功');
			})
			videoAd.onError((err) => {
			  console.log(err);
			})
			videoAd.onClose((res) => {
			  if (res && res.isEnded) {
			    console.log('激励视频 播放完成');
			    //这里触发真正参与
			    
			  } else {
			    console.log('激励视频 未完关闭');
			  }
			})
			// #endif
		},
		methods: {
			btnPhoto() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.imgfile = res.tempFilePaths[0];
						// 重置上一次选择查询的名称
						this.selectedName="";
						this.searchResults=null;
						this.recResults=[];
						this.readImage2Base64(this.imgfile);
					}
				})
			},
			readImage2Base64(path){
				
				wx.getFileSystemManager().readFile({
				  filePath: path, 
				  encoding: 'base64', 
				  success:async (res)=> { 
				    console.log(res);
					const result=await this.imageClassify(res.data);
					
					this.parseResults(result.result);
				  }
				})
				
				
			},
			parseResults(result){
				uni.hideLoading();
				
				this.recResults=result;
				
				let itemList=[];
				let abs_result_index;
				for(let i=0;i<result.length;i++){
					if(result[i].score>.7){
						abs_result_index=i;
						break;
					}
					itemList.push(result[i].keyword+""+result[i].score);
				}
				
				if(abs_result_index>=0){
					this.selectRecResult(abs_result_index);
					return;
				}
				
				uni.showActionSheet({
					itemList:itemList,
					success: (res) => {
						this.selectRecResult(res.tapIndex);
					}
				});
			},
			async selectRecResult(index){
				this.selectedName=this.recResults[index].keyword;
				const searchRes = await this.searchKeyword(this.selectedName);
				console.log(searchRes);
				this.searchResults = searchRes;
				uni.hideLoading();
			},
			searchKeyword(kw){
				return new Promise((resolve,reject)=>{
					uniCloud.callFunction({
						name:"TrashClassify",
						data:{
							keyword:kw
						},
						success: (res) => {
							resolve(res.result);
						}
					})
				});
			},
			async imageClassify(imgB64) {
				// 文档：https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu
				// 先通过自己申请的AppId和Secret去鉴权认证获取AccessToken
				var [error, res] = await uni.request({
					url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=WDWt5vie2bNBUMjXtYkexm1a&client_secret=p3NKlG6fkYFL3emGuakYprTWgkhgdURI&"
				});
				let access_token = res.data.access_token;
				
				var [error, res] = await uni.request({
					url:"https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
					method:"post",
					header:{
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						access_token:access_token,
						image: imgB64
					}
				});
				
				console.log(res);
				return res.data;
				
				return new Promise((resolve,reject)=>{
					uniCloud.callFunction({
						name:"imageClassify",
						data:{
							image:imgB64
						},
						success: (res) => {
							resolve(res.result);
						}
					})
				});
			}
		}
	}
</script>

<style>
	view {
		box-sizing: border-box;
	}
</style>
