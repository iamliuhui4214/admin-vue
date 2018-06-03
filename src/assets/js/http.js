import axios from 'axios'
// 将axios封装为vue插件

// 建议通过定义插件的配置来扩展vue本身

// 1 定义一个插件对象
const httpPlugin = {}

// 2 为插件添加一个成员：install
// 必须是install
// install是一个函数
// 该函数接收两个参数 Vue  options
httpPlugin.install = function (Vue, options) {
// 3 添加实例方法
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}

// 4 导出插件对象
export default httpPlugin
