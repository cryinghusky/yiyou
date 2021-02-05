const {
	Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
const { getJDServerParmas } = require('./util')
const config = require('../util/config')
module.exports = class JdService extends Service {
	async jingfenQuery() {
		let param_json = {
			goodsReq:{
				eliteId:"22"
			}
		};
		param_json = JSON.stringify(param_json);
		let parmas = getJDServerParmas('jd.union.open.goods.jingfen.query',param_json);
		// return parmas;
		const res = await uniCloud.httpclient.request(config.JDUrl, {
		    method: 'GET',
		    data: {
				...parmas
		    },
		    contentType: 'json', // 指定以application/json发送data内的数据
		    dataType: 'json' // 指定返回值为json格式，自动进行parse
		})
		let jdData = res.res.data.jd_union_open_goods_jingfen_query_response;
		jdData.result = JSON.parse(jdData.result);
		return jdData;
	}
	//获取接口系统参数
	async getJDServerParmas(method) {
		return getJDServerParmas(method);
		
	}
}
