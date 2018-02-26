<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.bill-detail{
		width: 100%;
		.bd-info{
			width: 100%;
			.bd-group{
				width: 100%;
				font-size: 18px;
				color: map-get($color,100);
				@include flexLayout(flex,normal,center);
				background-color: rgba(map-get($nav,logo),.2);
				padding: 12px 0;
				border-bottom: 2px solid map-get($color,100);
				&.title{
					background-color: map-get($color,100);
					color: map-get($color,200);
					border-radius: 10px 10px 0 0;
					border-bottom: none;
				}
				.bd-gname{
					flex: 0 0 30%;
					max-width: 200px;
					text-align: center;
					font:inherit;
					color: inherit;
				}
				.bd-gvalue{
					flex: 0 0 70%;
					max-width: calc(100% - 200px);
					text-align: center;
					font:inherit;
					color: inherit;
					&.tar{
						color: map-get($color,600);
					}
				}
			}
		}
		.bd-buttons{
			width: 100%;
			padding: 24px 0;
			@include flexLayout(flex,center,center);
			.ask-button{
				min-width: auto;
				margin: 0 10px;
				padding: 12px 40px;
				font-size: 24px;
				color: map-get($color,200);
				background-color: rgba(map-get($localtion,100),.8);
				border-radius: 4px;
				.iconfont{
					font:inherit;
					color: inherit;
				}
				&.del{
					background-color: rgba(map-get($localtion,300),.8);
				}
			}
		}
	}
</style>
<template>
	<div class="bill-detail">
		<div class="bd-info">
			<div class="bd-group title">
				<div class="bd-gname">名称</div>
				<div class="bd-gvalue">值</div>
			</div>
			<template v-for="item,$i in list.items">
				<div class="bd-group">
					<div class="bd-gname">{{item.name}}</div>
					<div class="bd-gvalue" :class="{'tar': item.value >= 100}">{{item.value}}</div>
				</div>
			</template>
			<template v-if="!list.items || list.items.length == 0">
				<div class="null-text">暂无数据</div>
			</template>
		</div>
		<div class="bd-buttons">
			<ask-button @click.native="edit($event)">
				<i class="iconfont icon-bianji"></i>
			</ask-button>
			<ask-button class="del" @click.native="del($event)">
				<i class="iconfont icon-shanchu"></i>
			</ask-button>
		</div>
		<bill-form title="编辑账单明细" :model="model" :show.sync="show" :isEdit="true" :beforeClose="beforeClose"></bill-form>
	</div>
</template>
<script>
import { Bill } from '@/services';
import { merge,askDialogToast,askDialogConfirm } from '@/utils';
import billForm from '@core/bill/bill-form.vue';
	export default{
		name:"BillDetail",
		props:['list'],
		inject:['rootMain'],
		provide() {
			return {
				rootBill: this
			};
		},
		components:{
			'bill-form':billForm,
		},
		data(){
			return{
				model:{},
				show:false
			}
		},
		methods:{
			del(e){
				e.stopPropagation();
				askDialogConfirm({
					title: '删除账单明细',
					content: `确定删除"${this.list.name}"的账单？`,
					transition:"bill-modal-slide"
				}, (vm) => {
					let _bill = merge(true,{},this.$parent.bill);
					let _index = _bill.list.findIndex(u=>u.user_id == this.list.user_id);
					_bill.list.splice(_index,1);
					const billServer = new Bill();
					this.rootMain.loader(true);
					billServer.update(_bill._id,_bill).then(r=>{
						this.rootMain.loader(false);
						askDialogToast({msg:`"${this.list.name}"的明细删除成功!`,class:"success",time:2000});
						setTimeout(()=>{
							vm.close();
							this.$router.push({path:'/'});
						}, 500);
					},error=>{
						this.rootMain.loader(false);
					})
				});
			},
			edit(e){
				e.stopPropagation();
				this.model = this.list;
				this.show = true; 
			},
			beforeClose(close,model){
				let _bill = merge(true,{},this.$parent.bill);
				let _index = _bill.list.findIndex(u=>u.user_id == model.user_id);
				_bill.list[_index] = model;
				const billServer = new Bill();
				this.rootMain.loader(true);
				billServer.update(_bill._id,_bill).then(r=>{
					this.rootMain.loader(false);
					askDialogToast({msg:`"${model.name}"的明细更新成功!`,class:"success",time:2000});
					this.$nextTick(()=>{
						close();
						this.$parent.updateBill(_index,model);
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