<template>
	<view>
		<view class="goods-item" v-for="(item,index) in list" :key="index" @click="gotoDetail(item)">
		  <!-- 商品左侧图片区域 -->
		  <view class="goods-item-left">
		    <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		  </view>
		  <!-- 商品右侧信息区域 -->
		  <view class="goods-item-right">
		    <!-- 商品标题 -->
		    <view class="goods-name">{{item.goods_name}}</view>
		    <view class="goods-info-box">
		      <!-- 商品价格 34.5678 => 34.58 -->
		      <view class="goods-price">￥{{fixedPrice(item.goods_price)}} &yen;</view>
		    </view>
		  </view>
		</view>
	</view>
		
</template>

<script>
	export default {
		name:"my-goods",
		// props: {
		// 	"item": {
		// 		type: Object,
		// 		default: {}
		// 	}
		// },
		props: {
			"list": {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				// 如果有的商品 没有封面小图片 那么就应用这个图片地址的图片
				defaultPic: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
				fixedList: []
			};
		},
		methods: {
			fixedPrice(price){
				// console.log(price);
				// Number(23.45678).toFixed(2)
				// 保留两位小数 ==》 23.45
				return Number(price).toFixed(2)
			},
			gotoDetail(item){
				// console.log(item);
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},

		computed: {
		// accountInUSD() {
		// 	console.log(this.list);
		// 	// this.list.forEach((item,index)=>{
				
		// 	// });
		//         // return '$' + this.accountBalance
		//       }
		}
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
		// space-between 两端对齐  space-around 空间环绕
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
