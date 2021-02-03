const {
	Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserService extends Service {
	async login({
		code
	}) {
		const res = await uniID.loginByWeixin({
			code: code
		})
		return res
	}
	//更新用户数据
	async updateUser(token,UpdateUserParams) {
		const payload = await uniID.checkToken(token);
		if (payload.code) {
			return payload;
		}
		const res = await uniID.updateUser({
		    uid: payload.uid,
		    ...UpdateUserParams
		})
		return res
	}
	
	//获取用户数据
	async getUserInfo(token){
		await this.checkToken(token);
		const res = await uniID.getUserInfo({
		    uid: this.ctx.auth.uid
		})
		return res;
	}
	
	//验证Token
	async checkToken(token){
		// token = '11222';
		const auth = await uniID.checkToken(token, {
			needPermission: false,
			needUserInfo: false
		})
		if (auth.code) {
			// 校验失败，抛出错误信息
			this.ctx.throw('TOKEN_INVALID', `${auth.message}，${auth.code}`)
		}
		this.ctx.auth = auth // 设置当前请求的 auth 对象
	}
}
