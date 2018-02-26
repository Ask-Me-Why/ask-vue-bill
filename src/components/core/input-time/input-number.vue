<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.input-number{
		display: inline-block;
		text-align: center;
		margin: 0 4px;
		.ask-button{
			min-width: auto;
			padding: 0;
			text-align: center;
			width: 20px;
			height: 20px;
			background-color: map-get($color,A300);
			border-radius: 6px 6px 0 0 ;
			color: map-get($color,200);
			line-height: 20px;
			&.reduce{
				border-radius: 0 0 6px 6px;
			}
		}
		.val{
			padding: 16px 0;
			font-size: 1.6rem;
			color: map-get($color,A100);
		}
	}
</style>
<template>
	<div class="input-number">
		<ask-button class="add" @ask-click="onClick('add')">+</ask-button>
		<div class="val">{{handleNum(calcVal)}}</div>
		<ask-button class="reduce" @ask-click="onClick('reduce')">-</ask-button>
	</div>
</template>
<script>
import { handlerSingleDigit } from '@/utils';
	export default{
		name:"InputNumber",
		props:{
			val:{
				type: Number,
				default: 0
			},
			max:{
				type: Number,
				default: null
			},
			min:{
				type: Number,
				default: null
			},
			type:{
				type: String,
				default: null
			}
		},
		computed:{
			handleNum(){
				return handlerSingleDigit;
			}
		},
		data(){
			return{
				calcVal: 0
			}
		},
		methods:{
			onClick(type){
				if(type == 'add'){
					this.calcVal++;
					if(this.max != null){
						this.calcVal = Math.min(this.max,this.calcVal);
					}
				}
				if(type == 'reduce'){
					this.calcVal--;
					if(this.min != null){
						this.calcVal = Math.max(this.min,this.calcVal);
					}
				}
				this.$emit('number-change',this.calcVal,this.type);
			}
		},
		watch: {
			val(n,o){
				this.calcVal = this.val;
			}
		}
	}
</script>