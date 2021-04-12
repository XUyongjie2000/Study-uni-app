export default {
	namespaced: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	},
	mutations: {
		updateAddress(state, address){
			state.address = address;
			
		this.commit("storeUser/saveAddressToStorage");
		},
		saveAddressToStorage(state) {
			// 把数据存储到本地 chrome引擎
			uni.setStorageSync('address', JSON.stringify(state.address|| {}));
		},
	},
	actions: {},
	getters: {
		addrstr(state){
			// 判断
			if(state.address.provinceName === '') return '';
			// 拼接字符串 广东省
			return `${state.address.provinceName} ${state.address.cityName} ${state.address.countyName} ${state.address.detailInfo}`
		}
	}
}
