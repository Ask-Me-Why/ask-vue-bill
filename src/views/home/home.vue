<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ask-view-box.home {
	position: relative;
	height: 100%;
	overflow-y:auto;
	background-color: map-get($color,200D1);
	&::-webkit-scrollbar {
		width: 8px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-track {
		border-radius: 0;
		background-color: rgba(map-get($color, 100), 1);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background-color: rgba(map-get($color,700), .6);
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(map-get($color,700), .8);
	}
	&::-webkit-scrollbar-thumb:active {
		background-color: rgba(map-get($color,700), 1);
	}
	.home-tab{
		width: 100%;
		padding: 10px 0;
		@include flexLayout(flex,normal,center);
		.ht-title{
			font-size: 20px;
			color: map-get($color,300);
			margin-right: 20px;
		}
		.ht-body{
			font-size: 16px;
		}
	}
	.home-body{
		width: 100%;
		padding: 10px 0;
		.hb-add-bill{
			display: block;
			margin: 20px auto;
			width: 200px;
			min-width: auto;
			padding: 20px 0;
			text-align: center;
			color: map-get($color,700);
			border: 4px solid map-get($color,700);
			font-size: 20px;
			.iconfont{
				font:inherit;
				color: inherit;
			}
		}
	}
	.home-table{
		width: 100%;
		.ht-group{
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
			.ht-gth{
				flex: 0 0 12.5%;
				text-align: center;
				font:inherit;
				color: inherit;
				&.slash{
					overflow: hidden;
					flex: 0 0 120px;
					height: 50px;
					.s-box{
						position: relative;
						width: 120px;
						max-width: 120px;
						height: 50px;
						transform: rotate(20deg);
						&::after{
							content:'';
							display: block;
							width: 100%;
							height: 2px;
							position: absolute;
							top: 50%;
							left: 0;
							margin: -1px 0 0 0;
							background-color: map-get($color,200);
						}
						.top{
							height: 24px;
							width: 100%;
							text-align: center;
						}
						.bottom{
							height: 24px;
							width: 100%;
							text-align: left;
							padding-left: 12px;
							transform: rotate(-20deg);
						}
					}
				}
			}
			.ht-gtb{
				flex: 0 0 12.5%;
				width: 100%;
				padding: 0 6px;
				white-space: normal;
				word-break:break-all;
				text-align: center;
				font:inherit;
				color: inherit;
				&.slash{
					overflow: hidden;
					flex: 0 0 120px;
				}
				&.receive{
					color: map-get($color,300S1);
				}
				&.pay{
					color: map-get($color,600);
				}
			}
		}
	}
}
.add-bill.ask-modal-box{
	.ask-modal-wrapper{
		width: 550px;
		text-align: center;
		padding: 0 0 20px;
		.ask-input-label{
			width: 100%;
			text-align: left;
		}
		.ask-button{
			min-width: auto;
			padding: 12px 24px;
			background-color: map-get($color,700);
			color: map-get($color,200);
			font-size: 18px;
		}
	}
}
</style>
<template>
	<div class="ask-view has-bar" v-nav="{hideNavBar:false}">
		<div class="ask-view-box home">
			<div class="boundary">
				<!-- <div class="home-tab">
					<div class="ht-title">筛选：</div>
					<div class="ht-body">
						<el-select v-model="value" placeholder="请选择" clearable>
							<el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div> -->
				<div class="home-body">
					<template v-for="bill in billData">
						<ask-bill :bill="bill">
						</ask-bill>
					</template>
					<ask-button class="hb-add-bill" @click.native="show = true;">
						<i class="iconfont icon-tianjia"></i>
					</ask-button>
				</div>
				<div class="home-table">
					<div class="ht-group title">
						<div class="ht-gth slash">
							<div class="s-box">
								<div class="top">姓名</div>
								<div class="bottom">账单名</div>
							</div>
						</div>
						<template v-for="user in userList">
							<div class="ht-gth">{{user.name}}</div>
						</template>
						<div class="ht-gth">账单总价</div>
					</div>
					<template v-for="bill in billTable">
						<div class="ht-group">
							<div class="ht-gtb slash">
								{{bill.name}}
							</div>
							<template v-for="item in bill.items">
								<div class="ht-gtb" :class="{'receive': item.price >= 0,'pay': item.price < 0}">
									<template v-if="item.pay == void 0">
										<div>--</div>
										<div>--</div>
									</template>
									<template v-else>
										<div>{{item.pay}}元</div>
										<div>{{item.price < 0 ? "出":"收"}} {{Math.abs(item.price.toFixed(10))}}元</div>
									</template>
								</div>
							</template>
							<div class="ht-gtb">
								{{bill.all}}元
							</div>
						</div>
					</template>
					
					<div class="ht-group">
						<div class="ht-gtb slash">
							总价
						</div>
						<template v-for="all in allTable">
							<div class="ht-gtb" :class="{'receive': all.price >= 0,'pay': all.price < 0}">
								<template v-if="all.pay == void 0">
									<div>--</div>
									<div>--</div>
								</template>
								<template v-else>
									<div>{{all.pay}}元</div>
									<div>{{all.price < 0 ? "出":"收"}} {{Math.abs(all.price.toFixed(10))}}元</div>
								</template>
							</div>
						</template>
						<div class="ht-gtb">
							{{allBillPrice}}元
						</div>
					</div>
					<template v-if="!billTable || billTable.length == 0">
						<div class="null-text">暂无数据</div>
					</template>
				</div>
			</div>
		</div>
		<ask-modal
			:title="title" 
			:show.sync="show"
			:beforeClose="beforeClose"
			:transition="'bill-modal-slide'"
			:showFooter="false"
			class="add-bill">
			<ask-input label="账单名称" v-model="billName"></ask-input>
			<ask-button @ask-click="onSave" @keyup.enter.native="onSave">save</ask-button>
		</ask-modal>
	</div>
</template>
<script>
let DEVICE_TIMER = null;
import askBill from '@core/bill/ask-bill.vue';
import {Bill} from '@/services';
import { merge,askDialogToast,askDialogConfirm } from '@/utils';
import moment from 'moment/moment.js';
export default {
	name: 'Home',
	inject:['rootMain'],
	components:{
		'ask-bill':askBill
	},
	provide() {
		return {
			rootHome: this
		};
	},
	computed:{
		userList:function(){
			return this.rootMain.getUser();
		},
		allTable:function(){
			let _r = [];
			this.userList.map((user,index)=>{
				let cur = {
					user_id: user._id,
					pay:0,
					price:0
				}
				this.billTable.map(bill=>{
					let _pay = bill.items[index].pay||0,
					    _price = bill.items[index].price||0;
					cur.pay += Number(_pay);
					cur.price += Number(_price);
				})
				_r.push(cur);
			})
			return _r;
		},
		billTable:function(){
			let _r = [];
			this.allBillPrice = 0;
			this.billData.map(bill=>{
				let once = {
					id: bill._id,
					name: bill.name,
					all: 0,
					items: merge(true,[],this.userList)
				}
				let _all = 0,_averagePrice = 0;
				bill.list.map(list=>{
					_all += Number(list.pay);
				})
				if(bill.list.length > 0){
					_averagePrice = _all/bill.list.length;
				}else{
					_averagePrice = _all;
				}
				once.items = once.items.map(item=>{
					let _index = bill.list.findIndex(list=> list.user_id == item._id);
					if(_index != -1 ){
						item.pay = bill.list[_index].pay;

						item.price = item.pay*100 - _averagePrice*100;
						item.price = item.price/100;
						
					}
					return item;
				});
				once.all = _all;

				this.allBillPrice += once.all;
				_r.push(once)
			})
			return _r;
		}
	},
	data() {
		return {
			show:false,
			title:"操作提醒",
			billName:"",
			value: '',
			allBillPrice:0,
			billData:[],
			billServer: new Bill()
		}
	},
	mounted(){
		if(this.userList.length > 0){

			this.initBill();
		}
	},
	methods:{
		initBill(){
			this.rootMain.loader(true);
			this.billServer.all().then(r=>{
				this.rootMain.loader(false);
				if(r.data.length == 0) return;
				let _bills = [];
				r.data.map(index=>{
					index.list = JSON.parse(index.list);
					_bills.push(index);
				})
				this.billData = _bills;
			},error=>{
				this.rootMain.loader(false);
			})
		},
		beforeClose(done){
			done();
		},
		onSave(){
			if(!this.billName){
				askDialogToast({msg:"请输入账单名称",class:"danger",time:2000});
				return;
			}
			this.rootMain.loader(true);
			this.billServer.create({
				name: this.billName,
				create: moment().format("YYYY-MM-DD HH:mm:ss"),
				list:[]
			}).then(r=>{
				this.rootMain.loader(false);
				this.show = false;
				if(r.data._id){
					askDialogToast({msg:`"${this.billName}"账单创建成功`,class:"success",time:2000});
					let _save = r.data;
					_save.list = JSON.parse(_save.list);
					this.billData.push(_save);
					this.billName = "";
				}
			},error=>{
				this.rootMain.loader(false);
			})
		},
		onRemove(bill){
			askDialogConfirm({
				title: '删除账单列表',
				content: `确定删除名称为"${bill.name}"的账单？`,
				transition:"bill-modal-slide"
			}, (vm) => {
				this.billServer.remove(bill._id).then(r=>{
					vm.close();
					if(r.data == bill._id){
						askDialogToast({msg:`"${bill.name}"已删除`,class:"success",time:2000});
						let _index = this.billData.findIndex(r=>r._id == bill._id);
						this.billData.splice(_index,1);
					}else{
						askDialogToast({msg:`"${bill.name}"删除失败`,class:"danger",time:2000});
					}
				})
			});
		},
		setBillTable(onceBill,onceUser){
			return;
			let once = {
				id: onceBill.id,
				name: onceBill.name,
				all: onceBill.all,
				items: merge(true,[],this.userList)
			}
			once.items = once.items.map(index=>{
				if(index._id == onceUser.user_id){
					index.pay = onceUser.pay;
					index.price = onceUser.price;
				}
				return index;
			})
			let _index = this.billTable.findIndex(bill=> bill.id == onceBill.id);
			if(_index != -1){
				this.$set(this.billTable,_index,merge(true,this.billTable[_index],once));
			}else{
				this.billTable.push(once);
			}
		}
	},
	destroyed(){
		this.$nextTick(()=>{
			this.show = false;
		})
	},
	watch:{
		"userList":{
			handler:function(n,o){
				if(n.length > 0){
					this.initBill();
				}
			},
			deep:true
		}
	}
}

</script>
