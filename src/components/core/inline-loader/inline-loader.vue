<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.inline-loader-box{
		display: inline-block;
		padding: 0 10px;
		.inline-loader{
			/* min-width: 50px; */
			animation: inline-loader-an 1s linear infinite;
			.iconfont{
				font-size: 2rem;
				color: map-get($color,500);
				display: inline-block;
			}
			@keyframes inline-loader-an{
				0%{
					transform: rotate(0deg);
				}
				100%{
					transform: rotate(360deg);
				}
			}
		}
	}
	
</style>
<template>
	<div class="inline-loader-box">
		<div class="inline-loader">
			<i class="iconfont icon-load1"></i>
		</div>
	</div>
</template>
<script>
	export default{
		name:"InlineLoader"
	}
</script>