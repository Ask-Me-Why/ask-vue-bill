<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.bill-tag{
		width: 100%;
		@include flexLayout(inline-flex,normal,center);
		.bt-name{
			min-width: 80px;
			font-size: 1.4rem;
			color: map-get($color,800);
		}
		.bt-value{
			min-width: 50px;
			.ask-input-label{
				width: 140px;
				position: relative;
				&::after{
					content:'';
					display: block;
					width: 20px;
					height: 27px;
					position: absolute;
					top: 34%;
					right: 0;
					background-color: map-get($color,200);
					z-index: 1;
				}
			}
		}
		.bt-del{
			margin-left: 10px;
			width: 34px;
			height: 34px;
			border-radius: 100%;
			overflow: hidden;
			.ask-button{
				width: 100%;
				height: 100%;
				padding: 0;
				min-width: auto;
				background-color: map-get($color,600);
				color:map-get($color,200);
				font-size: 1.6rem;
				.iconfont{
					color: inherit;
					font: inherit;
				}
			}
			&.bt-success{
				.ask-button{
					background-color: map-get($color,300S1);
				}
			}
		}
	}
</style>
<template>
	<div class="bill-tag">
		<div class="bt-name">{{name}}</div>
		<div class="bt-value">
			<ask-input :disabled="true" v-model="currentValue" type="number"></ask-input>
		</div>
		<!-- <div class="bt-del bt-success">
			<ask-button><i class="iconfont icon-gou"></i></ask-button>
		</div> -->
		<div class="bt-del">
			<ask-button @ask-click="onClick"><i class="iconfont icon-cha"></i></ask-button>
		</div>
	</div>
</template>
<script>
	export default{
		name:"BillTag",
		props:{
			name:String,
			value:[Number,String],
			index:{}
		},
		computed:{
			currentValue:{
				get(){
					return this.value;
				},
				set(val){
					this.$emit('input',val);
				}
			}
		},
		methods:{
			onClick(){
				this.$emit('del',this.index);
			}
		}
	}
</script>