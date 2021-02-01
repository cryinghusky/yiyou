import Vue from 'vue'

//页面跳转
Vue.prototype.navToPage = function (url, obj, type = 'navigateTo') { //精确到时分秒
    console.log(url);
    if (obj) {
        url = url + '?params=' + encodeURIComponent(JSON.stringify(obj));
        console.log(url);
        uni[type]({
            url: url,
        })
    } else {
        uni[type]({
            url: url,
            fail: function (res) {
                uni.switchTab({
                    url: url
                })
            },
        })
    }
}
//简单格式化字符串
Vue.prototype.formatStr = function(str,num1,num2) {
	// console.log(time);
	if(str){
		return str.substring(num1,num2);
	}else{
		return '';
	}
}

export default Vue;
