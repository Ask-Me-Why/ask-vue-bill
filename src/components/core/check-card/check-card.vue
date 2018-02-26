<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
	.ask-check-card{
		@include flexLayout(inline-flex,normal,center);
		.check-label{
			font-size: 1.6rem;
			padding: 0 4px;
			color: map-get($color,500S2);
		}
		.check-box{
			display: inline-block;
			font-size: 0;
			input[type^='checkbox'].acc-check {
				display: none;
				visibility: hidden;
				opacity: 0;
				&+label {
					position: relative;
					display: inline-block;
					width: 50px;
					height: 22px;
					cursor: pointer;
					transition: background .3s .3s linear;
					border-radius: 20px;
					background-color: map-get($color, 700S2);
					&::after {
						position: absolute;
						z-index: 1;
						top: 50%;
						left: 1px;
						display: block;
						width: 20px;
						height: 20px;
						margin-top: -10px;
						content: '';
						transition: transform .3s linear;
						border-radius: 100%;
						background-color: map-get($color, 200);
					}
				}
				&:checked+label {
					transition: background .3s .3s linear;
					background-color: map-get($color, 500);
					&::after {
						transition: transform .3s linear;
						transform: translateX(28px);
					}
				}
				&:disabled+label {
					transition: background .3 linear;
					background-color: map-get($color, 700);
					cursor: not-allowed;
				}
			}
		}
	}
</style>
<template>
	<div class="ask-check-card">
		<div class="check-box">
			<input type="checkbox" class="acc-check" :id="`acc_input_${checkId}`" v-model="checkInput">
			<label :for="`acc_input_${checkId}`" @click="changeState()"></label>
		</div>
		<div class="check-label">
			<slot name="label"></slot>
		</div>
	</div>
</template>
<script>
import { getInputId } from '@/utils';
	export default{
		name:"CheckCard",
		props:['check'],
		computed:{
			checkId(){
				return getInputId();
			}
		},
		data(){
			return{
				checkInput: false
			}
		},
		mounted(){
			this.checkInput = this.check;
		},
		methods:{
			changeState(){
				this.$nextTick(()=>{
					this.$emit('input-change',this.checkInput);
				})
			}
		},
		watch:{
			check(n,o){
				this.checkInput = n;
			}
		}
	}
</script>