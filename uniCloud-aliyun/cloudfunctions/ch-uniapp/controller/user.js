const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserController extends Controller {
	//登陆
	async login() {
		const {
			code
		} = this.ctx.data
		console.log(code);
		return this.service.user.login({
			code
		})
	}
	
	//修改用户信息
	async updateUser() {
		const {
			infoRes,
			token
		} = this.ctx.data
		let UpdateUserParams = {
			nickname:infoRes.userInfo.nickName,
			gender:infoRes.userInfo.gender,
			avatar:infoRes.userInfo.avatarUrl
		}
		return this.service.user.updateUser(token,UpdateUserParams)
	}
	
	//获取用户数据
	getUserInfo(){
		const {
			token
		} = this.ctx.data
		return this.service.user.getUserInfo(token)
	}
}
