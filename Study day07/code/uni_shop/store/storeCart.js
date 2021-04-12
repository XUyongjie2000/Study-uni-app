export default  {
	namespaced: true,
	state: {
		// 购物车
		cart: JSON.parse(uni.getStorageSync('cart')||'[]')
	},
	mutations: {
		// 创建addToCart方法
		// 把商品添加到购物车
		/**
		 * @param { Array } state 就是state中存的购物车信息
		 * @param {Object} payload 某一个商品
		 */
		addToCart(state,payload){
			// console.log(state);
			// console.log('+++++++++++++++')
			// console.log(payload);
			// 1.判断payload中的商品id是否存在于state中的cart中
				const resultFlag = state.cart.find(item=> item.goods_id === payload.goods_id);
				// console.log("*****************")
				// console.log(resultFlag);
			// 2.判断如果不存在 那么就把商品对象添加到cart数组中g
			if (!resultFlag) {
				state.cart.push(payload);
			} else {
				// 3.如果存在，那么就把某一个对象中的商品数量++
				resultFlag.goods_count++;
				// console.log(state.cart);
			}
			
			this.commit("storeCart/saveToStorage");
		},
		saveToStorage(state){
			// 把数据存储到本地 chrome引擎
			uni.setStorageSync("cart", JSON.stringify(state.cart)|| '[]');
		}
	
	},
	actions: {
		
	},
	getters: 
	{
		// 1.声明一个计算属性total
		total(state) {
			// 1.1 声明一个变量c 用来计数
			let c = 0;
			// 1.2 对c这个值进行累加
			state.cart.forEach(item=>{
				c+=item.goods_count;
			})
			// 1.3 return c
			return c;
		}
	}
}
