<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
			<block v-for="(item,i) in cateList" :key="i">
				<view class="['left-scroll-view-item',i === active? 'active': '']" @click="activeChanged(i)">
					{{item.cat_name}}
				</view>
			</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}">
				<view class="left-scroll-view-item">123</view>
				<view class="left-scroll-view-item">123</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,
				cateList:[],
				active:0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight
			//调用获取分类列表数据的方法
			this.getCataList()
		},
		methods:{
			async getCataList(){
				const {data:res}=await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status!==200){
					return uni.showToast({
						title:'数据请求失败',
						duration:1500,
						icon:'none'
					})
				}
				this.cateList=res.message
			},
			activeChanged(i){
				this.active=i
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			
			&.active{
				background-color: #ffffff;
				position: relative;
				
				&::before{
					content: ' ';
					display:block;
					width: 3px;
					height:30px;
					background-color: #c00000;
					position:absolute;
					left:0;
					top: 50%;
					transform:translateY(-50%);
				}
			}
		}
	}
}
</style>
