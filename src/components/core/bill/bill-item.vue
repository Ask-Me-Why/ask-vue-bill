<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.bill-item{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		.bi-overlay{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			pointer-events:none;
			z-index: 6;
			.ask-button{
				width: 100%;
				height: 100%;
				@include flexLayout(flex,center,center);
				color: map-get($color,200);
				font-size: 6rem;
				padding: 0;
				pointer-events: auto;
				.iconfont{
					color: inherit;
					font: inherit;
					display: inline-block;
					transform-origin: 50% 0;
					transform: translateZ(0) scale(1);
					transition: transform .3s ease;
				}
				&:hover{
					.iconfont{
						transform-origin: 50% 0;
						transform: translateZ(0) scale(1.2);
						transition: transform .3s ease;
					}
				}
			}
			.bi-oheader{
				width: 100%;
				height: 35%;
				background-color: rgba(map-get($localtion,100),.5);
				transform: translateX(100%) translateZ(0);
				transition: transform .3s ease;
				&:hover{
					background-color: rgba(map-get($localtion,100),1);
					transition: background .3s linear;
				}
			}
			.bi-obody{
				width: 100%;
				height: 30%;
				background-color: rgba(map-get($icon,100),.5);
				transform: translateX(-100%) translateZ(0);
				transition: transform .3s ease;
				&:hover{
					background-color: rgba(map-get($icon,100),1);
					transition: background .3s linear .2s;
				}
			}
			.bi-ofooter{
				width: 100%;
				height: 35%;
				background-color: rgba(map-get($localtion,300),.5);
				transform: translateX(100%) translateZ(0);
				transition: transform .3s ease;
				&:hover{
					background-color: rgba(map-get($localtion,300),1);
					transition: background .3s linear;
				}
			}
		}
		&:hover .bi-overlay{
			.bi-oheader{
				transform: translateX(0) translateZ(0);
				transition: transform .3s ease ;
			}
			.bi-obody{
				transform: translateX(0) translateZ(0);
				transition: transform .3s ease .2s;
			}
			.bi-ofooter{
				transform: translateX(0) translateZ(0);
				transition: transform .3s ease .4s;
			}
		}
		.bi-content{
			position: relative;
			z-index: 2;
			width: 100%;
			padding: 10px;
			.cover{
				width: 100%;
				.img-box{
					position: relative;
					width: 100%;
					padding: 50% 0;
					overflow: hidden;
					border-radius: 100%;
					img{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						overflow: hidden;
						border-radius: 100%;
					}
				}
			}
			.name{
				font-size: 2rem;
				text-align: center;
				padding: 10px 0;
				@include textEllipsis(1);
			}
			.text{
				font-size: 1.6rem;
				text-align: center;
				white-space: normal;
				word-break: break-all;
				&.result{
					font-size: 3rem;
					padding: 5px 0;
				}
			}
		}
	}
</style>
<template>
	<div class="bill-item">
		<div class="bi-overlay">
			<div class="bi-oheader">
				<ask-button @click.native="edit($event)">
					<i class="iconfont icon-bianji"></i>
				</ask-button>
			</div>
			<div class="bi-obody">
				<ask-button @click.native="view($event)">
					<i class="iconfont icon-chakan"></i>
				</ask-button>
			</div>
			<div class="bi-ofooter">
				<ask-button @click.native="del($event)">
					<i class="iconfont icon-shanchu"></i>
				</ask-button>
			</div>
		</div>
		<div class="bi-content">
			<div class="cover">
				<div class="img-box">
					<img :src="userInfo.logo" alt="头像">
				</div>
			</div>
			<div class="name">{{userInfo.name||'名字玩丢了'}}</div>
			<div class="text">支出:{{item.pay}}元</div>
			<div class="text result">
				<template v-if="price < 0">
					出:<span>{{Math.abs(price)}}</span>元
				</template>
				<template v-else>
					收:<span>{{Math.abs(price.toFixed(10))}}</span>元
				</template>
			</div>
		</div>
		<bill-form title="编辑账单明细" :model="model" :show.sync="show" :isEdit="true" :beforeClose="beforeClose"></bill-form>
	</div>
</template>
<script>
import { merge,askDialogToast,askDialogConfirm } from '@/utils';
import {Bill} from '@/services';
import billForm from './bill-form.vue';
export default {
	name: "BillItem",
	inject:['rootMain','rootBill','rootHome'],
	props:['queryId','item'],
	components:{
		'bill-form':billForm,
	},
	computed:{
		swoptions() {
			return {
				slidesPerView:'auto',
				spaceBetween: 20,
				freeMode: true,
				onInit: function(swiper) {
					this.swiper = swiper;
				}.bind(this)
			}
		},
		userInfo(){
			let _user = {
				name:"名字玩丢了",
				logo:""
			};
			let _userInfo  = this.rootMain.getUser();
			let _filterUser;
			if(_userInfo != null){
				_filterUser = _userInfo.filter(index=>index._id == this.item.user_id)[0];
			}
			return merge(true,_user,_filterUser);
		},
		price:{
			get(){
				let _p = Number(this.item.pay*100 - this.rootBill.averagePrice*100);
				
				return _p/100;
			}
		}
	},
	data(){
		return {
			show:false,
			model:{}
		}
	},
	methods:{
		edit(e){
			e.stopPropagation();
			this.show = true; 
			this.model = this.item;
		},
		view(e){
			e.stopPropagation();
			this.$router.push({path:`/detail/${this.queryId}/${this.item.user_id}`});
		},
		del(e){
			e.stopPropagation();
			let _index = this.rootBill.bill.list.indexOf(this.item),
				_bill = merge(true,{},this.rootBill.bill);
			_bill.list.splice(_index,1);
			askDialogConfirm({
				title: '删除账单明细',
				content: `确定删除"${this.item.name}"的账单？`,
				transition:"bill-modal-slide"
			}, (vm) => {
				const billServer = new Bill();
				billServer.update(_bill._id,_bill).then(r=>{
					askDialogToast({msg:`"${this.item.name}"的明细删除成功!`,class:"success",time:2000});
					this.rootBill.bill.list.splice(_index,1);
					vm.close();
				},error=>{
					// this.loader = false;
				})
			});
		},
		beforeClose(close,model){
			let _bill = merge(true,{},this.rootBill.bill);
			let _index = _bill.list.findIndex(u=>u.user_id == model.user_id);
			_bill.list[_index] = model;
			const billServer = new Bill();
			this.rootMain.loader(true);
			billServer.update(_bill._id,_bill).then(r=>{
				this.rootMain.loader(false);
				askDialogToast({msg:`"${model.name}"的明细更新成功!`,class:"success",time:2000});
				this.$nextTick(()=>{
					close();
					this.$set(this.rootBill.bill.list,_index,model);
				})
			},error=>{
				this.rootMain.loader(false);

			})
		}
	},
	watch:{
		show(n,o){
			if(!this.show){
				this.model = {};
			}
		}
	}
}
</script>
