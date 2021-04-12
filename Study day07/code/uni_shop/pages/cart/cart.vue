<template>
	<view>
		
	</view>
</template>

<script>
	import badge from "../../mixins/tabbar-badge.js"
	export default {
		mixins: [badge],
		data() {
			return {
				
			};
		},
	
		methods:{
			// setBadge(){
			// 	uni.setTabBarBadge({
			// 		index: 2,
			// 		text: this.total+''
			// 	})
			// }
		},
		// onShow() {
		// 	this.setBadge();
		// },
		// computed: {
		// 	...mapGetters('storeCart', ['total'])
		// }
	}
</script>

<style lang="scss">

</style>
