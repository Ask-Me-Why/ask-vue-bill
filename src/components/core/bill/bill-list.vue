<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.bill-list-swiper{
		width: 100%;
		.swiper-slide{
			width: auto;
			width: 200px;
			height: 350px;
			border: 4px solid map-get($color,400D1);
			color: map-get($color,400D1);
			overflow: hidden;
			border-radius: 8px;
			background-color: map-get($color,200);
			.cover .img-box{
				border: 2px solid map-get($color,400D1);
			}
			&:nth-child(4n+1){
				border: 4px solid map-get($loader,100S1);
				color: map-get($loader,100S1);
				.cover .img-box{
					border: 2px solid map-get($loader,100S1);
				}
			}
			&:nth-child(4n+2){
				border: 4px solid map-get($loader,200S1);
				color: map-get($loader,200S1);
				.cover .img-box{
					border: 2px solid map-get($loader,200S1);
				}

			}
			&:nth-child(4n+3){
				border: 4px solid map-get($loader,300S1);
				color: map-get($loader,300S1);
				.cover .img-box{
					border: 2px solid map-get($loader,300S1);
				}

			}
			&:nth-child(4n+4){
				border: 4px solid map-get($loader,400S1);
				color: map-get($loader,400S1);
				.cover .img-box{
					border: 2px solid map-get($loader,400S1);
				}

			}
			&.add{
				border: 4px solid map-get($color,400D1);
				color: map-get($color,400D1);
				.ask-button{
					color: map-get($color,400D1);
				}
			}
		}
		.abb-badd{
			min-width: auto;
			width: 100%;
			height: 100%;
			padding: 0;
			.iconfont{
				font-size: 10rem;
			}
		}
	}
</style>
<template>
	<ask-swiper class="bill-list-swiper" :options="swoptions">
		<template v-for="item in list">
			<ask-slide>
				<bill-item :queryId="$parent.bill._id" :item="item"></bill-item>
			</ask-slide>
		</template>
		<template v-if="list.length < userList.length">
			<ask-slide class="add">
				<ask-button class="abb-badd" @ask-click="create"><i class="iconfont icon-tianjia"></i></ask-button>
			</ask-slide>
			<bill-form title="新增账单明细" :model="model" :show.sync="show" :beforeClose="beforeClose"></bill-form>
		</template>
	</ask-swiper>
</template>
<script>
import billItem from './bill-item.vue';
import billForm from './bill-form.vue';
import {User,Bill} from '@/services';
import { askDialogToast,merge } from '@/utils';
export default {
	name: "BillList",
	props:['list'],
	inject:['rootMain'],
	components:{
		'bill-item':billItem,
		'bill-form':billForm,
	},
	computed:{
		swoptions() {
			return {
				slidesPerView:'auto',
				spaceBetween: 20,
				freeMode: true,
				observer:true,
				observeParents:true,
				onInit: function(swiper) {
					this.swiper = swiper;
				}.bind(this)
			}
		},
		userList:{
			get(){
				return this.rootMain.getUser();
			}
		}
	},
	data(){
		return{
			show:false,
			model:{},
			swiper:null
		}
	},
	methods:{
		create(){
			this.show = true;
		},
		beforeClose(close,model){
			let _bill = merge(true,{},this.$parent.bill);
			_bill.list.push(model);
			const billServer = new Bill();
			this.rootMain.loader(true);
			billServer.update(_bill._id,_bill).then(r=>{
				this.rootMain.loader(false);
				askDialogToast({msg:`"${model.name}"的明细创建成功!`,class:"success",time:2000});
				this.$nextTick(()=>{
					close();
					this.$parent.bill.list.push(model);
				})
			},error=>{
				this.rootMain.loader(false);

			})
		}
	},
	watch:{
		show(n,o){
			this.model = {};
		}
	}
}
</script>
