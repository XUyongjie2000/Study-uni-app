<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllStates">
			<radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{ Number(checkedGoodsAmount).toFixed(2)}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex";
	export default {
		name: "my-settle",
		data() {
			return {
				second: 3,
				timer: null
			};
		},
		methods: {
			...mapMutations('storeCart', ['updateAllGoodsState']),
			changeAllStates() {
				this.updateAllGoodsState(!this.isFullChecked);
			},
			settlement() {
				// 判断 用户是否已经勾选了商品
				// console.log(this.checkedCount)
				if (!this.checkedCount) return uni.$toast("您还没有选择商品!!!");
				// 判断用户是否选择了收货地址
				// console.log(this.address)
				if (JSON.stringify(this.address) === '{}') return uni.$toast("您还没有选择地址!!!!");
				// 判断用户是否登录
				if (!this.token) return this.dalayNavigator(this.second);

			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					duration: 2000,
					mask: true,
				});
			},
			dalayNavigator() {
				this.showTips(this.second);
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					// 每隔1秒 让我们的秒数 --
					this.second--;
					if (this.second <= 0) {
						clearInterval(this.timer);
						uni.switchTab({
							url:"/pages/my/my"
						})
						this.second = 3;
					  return;
					}
				
					// 每次自减，调用showTips
					this.showTips(this.second);
					
				}, 1000)
			}
		},
		computed: {
			...mapGetters('storeCart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapState('storeUser', ['address', 'token']),
			isFullChecked() {
				return this.total == this.checkedCount
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
