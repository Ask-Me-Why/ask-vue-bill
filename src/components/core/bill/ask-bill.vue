<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-bill{
		padding: 10px 0;
		.ask-bill-box{
			padding: 14px 0;
			border: 1px solid map-get($color,400);
			border-radius: 4px;
			cursor: pointer;
			box-shadow: 0 0 12px map-get($color,500);
			background-color: map-get($color,200);
			&:hover{
				border: 1px solid map-get($color,400D1);
				transition: border .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
			}
			.abb-header{
				padding:  0 14px 14px;
				border-bottom: 1px solid map-get($color,300);
			}
			.abb-body{
				padding: 20px;
				box-shadow: inset 0 0 12px map-get($color,100);
			}
			.abb-footer{
				padding:  14px 14px 0;
				border-top: 1px solid map-get($color,600);
				@include flexLayout(flex,right,center);
				.ask-button{
					min-width: auto;
					padding: 10px 40px;
					color: map-get($color,200);
					background-color: map-get($color,600);
					.iconfont{
						font-size: 1.8rem;
					}
				}
			}
			.abb-title{
				font-size: 2rem;
				color: map-get($color,800);
				@include textEllipsis(1);
				small{
					font-size: 1.4rem;
					color: map-get($color,800S1);
					padding-left: 10px;
				}
			}
			.abb-detail{
				width: 100%;
				padding: 10px 0 0;
				@include flexLayout(flex,justify,center);
				.text{
					max-width: 33%;
					white-space: normal;
					word-break:break-all;
					font-size: 1.6rem;
					color: map-get($color,800D1);
				}
			}
		}
	}
</style>
<template>
	<div class="ask-bill">
		<div class="ask-bill-box">
			<div class="abb-header">
				<div class="abb-title">{{bill&&bill.name}}<small>{{bill&&bill.create}}</small></div>
				<div class="abb-detail">
					<div class="text">All:<span>{{allPrice}}元</span></div>
					<div class="text">人数:<span>{{bill&&bill.list.length}}</span></div>
					<div class="text"><span>{{averagePrice}}元/人</span></div>
					<div class="text">约<span>{{averagePrice.toFixed(1)}}元/人</span></div>
				</div>
			</div>
			<div class="abb-body">
				<bill-list :list="bill.list" :averagePrice="averagePrice"></bill-list>
			</div>
			<div class="abb-footer">
				<ask-button @ask-click="onRemove"><i class="iconfont icon-shanchu"></i></ask-button>
			</div>
		</div>
	</div>
</template>
<script>
import billList from './bill-list.vue';
import Mixins from './mixins.js';
export default {
	name: "AskBill",
	provide() {
		return {
			rootBill: this
		};
	},
	props:['bill'],
	mixins:[Mixins],
	components:{
		'bill-list':billList
	},
	methods:{
		onRemove(){
			this.$parent.onRemove(this.bill);
		}
	}
}
</script>
