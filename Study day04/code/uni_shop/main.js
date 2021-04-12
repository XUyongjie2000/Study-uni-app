import Vue from 'vue'
import App from './App'

// 消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// 封装uni的网络请求(https://www.npmjs.com/package/@escook/request-miniprogram)
// 1.导入包
import { $http } from '@escook/request-miniprogram'
// 2.把包挂载到uni这个顶级对象上
uni.$http = $http;
// 3.设置基准地址
$http.baseUrl = 'https://www.uinav.com';
// 4.设置请求拦截器(在请求之前 提示 数据正在加载中)
$http.beforeRequest = function (options) {
  // do somethimg...
	uni.showLoading({
	    title: '加载中...'
	});
}

// 5.设置响应拦截器(让提示消失)
$http.afterRequest = function () {
  setTimeout(function () {
      uni.hideLoading();
  }, 2000);
}


// 定义提示信息的方法
uni.$toast = function(title="获取数据失败",duration=1500){
	uni.showToast({
	    title: title,
	    duration: duration,
			icon: 'none'
	});
}