const md5 = require('../util/md5.js');
const config = require('../util/config.js');

//处理JD接口参数
function getJDServerParmas (method,param_json){
	let timestamp = formatDate('Y-m-d H:i:s',Date.parse(new Date()));
	let params = {
		method: method,
		app_key: config.JDAppKey,
		access_token: '',
		timestamp: timestamp,
		format: 'json',
		v: '1.0',
		sign_method: 'md5',
		sign: '',
	}
	if (param_json) {
		params.param_json = param_json
	}
	//object转string,用于签名计算
	var keys = Object.keys(params)
	keys = keys.sort() //参数名ASCII码从小到大排序（字典序）；
	var newArgs = {}
	keys.forEach(function (key) {
		if (params[key] != "" && params[key] != 'undefined') {  //如果参数的值为空不参与签名；
			newArgs[key] = params[key]  //参数名区分大小写；
		}
	  
	})
	var string = ''
	for (let k in newArgs) {
		string += k + newArgs[k]
	}
	params.sign = signMD5(config.JDSecretKey + string + config.JDSecretKey);
	params.sign = params.sign.toUpperCase();
	return params;
}

//md5加密
function signMD5(str) {
	return md5(str);
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
function formatDate (format, timeStamp) {
	if('' + timeStamp.length <= 10){
		timeStamp = + timeStamp * 1000;
	}else{
		timeStamp = + timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key=>{
		return {Y,m,d,H,i,s}[key];
	});
}

module.exports = {
	getJDServerParmas,
	signMD5
}
