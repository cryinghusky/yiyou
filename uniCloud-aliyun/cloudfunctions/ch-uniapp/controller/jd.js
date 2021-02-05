const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class JdController extends Controller {
	//京粉精选商品查询接口
	async jingfenQuery() {
		return this.service.jd.jingfenQuery();
	}
}
