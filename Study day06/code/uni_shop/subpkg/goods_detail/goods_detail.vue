<template>
	<view class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goods_info.goods_name">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费{{num}}</view>
		</view>

		<!-- 商品详情信息 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 底部菜单 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
	 import store from "../../store";
	 import { mapState } from 'vuex'

	export default {
		data() {
			return {
				// 1.1声明商品详情字段
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			// 1.3 调用获取商品详情方法
			this.getGoodsInfo(options.goods_id)
		},
		methods: {
			// 1.2 声明获取商品详情方法
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/goods/detail", {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$toast();
				console.log(res);
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					'<img style="display: block;"').replace(/webp/g, 'jpg');
				this.goods_info = res.message;
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(a => a.pics_big)
				})
			},
			// 点击购物车图片 跳转到购物车页面
			onClick(e) {
				// console.log("++++++++++++++++++++++++++++++");
				// console.log(e);
				uni.switchTab({
				  url: '/pages/cart/cart'
				})
			},
			// 点击加入购物车 让购物车的数量增加
			buttonClick(e) {
				console.log("*************");
				// console.log(e)
				if (e.content.text  === "加入购物车") {
					// uni.$toast("跳转到购物车");
					 // 切换到购物车页面
					    // uni.switchTab({
					    //   url: '/pages/cart/cart'
					    // })
				}
			}
		},
		computed:{
			...mapState("storeCart", ['num'])
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// .lazy img {

		// }

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
	
	.goods-detail-container {
	  // 给页面外层的容器，添加 50px 的内padding，
	  // 防止页面内容被底部的商品导航组件遮盖
	  padding-bottom: 50px;
	}
	
	.goods_nav {
	  // 为商品导航组件添加固定定位
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	}
</style>
