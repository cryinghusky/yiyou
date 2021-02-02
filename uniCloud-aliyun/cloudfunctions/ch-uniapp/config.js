const auth = require('./middleware/auth')

module.exports = initPlugins({
	debug: true, // 调试模式时，将返回 stack 错误堆栈
	baseDir: __dirname, // 项目根目录
	plugin: {}, // 插件配置，可设置是否启用某插件及插件所有参数
	middleware: []
})
