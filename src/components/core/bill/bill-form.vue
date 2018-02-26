<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.bill-form-popup.ask-modal-box{
		.bill-form-box{
		}
	}
	.bill-form-box{
		width: 100%;
		.bf-group{
			width: 100%;
			.g-label{
				width: 100%;
				padding: 10px 0;
				font-size: 1.8rem;
			}
			.g-body{
				width: 100%;
			}
		}
	}
	.bill-tag-list{
		max-height: 400px;
		overflow-y:auto;
		@include flexLayout(flex,normal,top);
		flex-flow:row wrap;
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
		.bill-tag{
			width: 50%;
		}
	}
	.bill-tag-add{
		width: 100%;
		@include flexLayout(flex,normal,center);
		.ask-input-label{
			&.name{
				width: 100px;
				margin-right: 10px;
			}
			&.value{
				width: calc(100% - 100px - 100px - 10px - 10px);
				margin-right: 10px;
			}
			input{
				height: 27px;
			}
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
		.ask-button{
			min-width: auto;
			width: 100px;
			text-align: center;
			padding: 10px 0;
			background-color: map-get($color,300S1);
			color:map-get($color,200);
			font-size: 2rem;
		}
	}
	.bf-group.group-button{
		text-align: center;
		padding: 20px 0;
		.ask-button.save{
			min-width: auto;
			padding: 12px 80px;
			background-color: map-get($color,700);
			color:map-get($color,200);
			font-size: 2.2rem;
			border-radius: 4px;
			overflow: hidden;
		}
	}
</style>
<template>
	<ask-modal 
		:title="title" 
		:show.sync="show"
		:beforeClose="modalBeforeClose"
		:transition="'bill-modal-slide'"
		:showFooter="false"
		class="bill-form-popup"
		>
		<div class="bill-form-box">
			<div class="bf-group">
				<div class="g-label">
					账单拥有人：
				</div>
				<div class="g-body">
					<el-select v-model="curModel.user_id" placeholder="请选择" clearable :disabled="isEdit">
						<el-option v-for="item in userList" :key="item._id" :label="item.name" :value="item._id" :disabled="item.disabled">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="bf-group">
				<div class="g-label">
					账单明细：
				</div>
				<div class="g-body">
					<div class="bill-tag-list">
						<bill-tag 
							v-for="(once,$i) in curModel.items" 
							:key="$i" 
							:name="once.name"  
							:value="once.value"
							:index="$i"
							@del="tagDel"
							type="show">
						</bill-tag>
					</div>
					<div class="bill-tag-add">
						<ask-input 
							class="name"  
							v-model="add.name" 
							@keyup.enter.native="handleInputConfirm">
						</ask-input>
						<ask-input 
							class="value" 
							type="number" 
							v-model="add.value" 
							@keyup.enter.native="handleInputConfirm">
						</ask-input>
						<ask-button
							@keyup.enter.native="handleInputConfirm"
							@click.native = "handleInputConfirm">
							<i class="iconfont icon-tianjia"></i>
						</ask-button>
					</div>
				</div>
			</div>
			<div class="bf-group group-button">
				<div class="g-body">
					<template v-if="isEdit">
						<ask-button class="save" @ask-click="editBill">更新账单</ask-button>
					</template>
					<template v-else>
						<ask-button class="save" @ask-click="addBill">新增账单</ask-button>
					</template>
				</div>
			</div>
		</div>
	</ask-modal>
</template>
<script>
import billTag from './bill-tag.vue';
import { merge,askDialogToast } from '@/utils';
export default {
	name: "BillItem",
	components:{
		'bill-tag': billTag
	},
	inject:['rootMain','rootBill'],
	props:{
		title:{
			type:String,
			default:'表单'
		},
		show: {
			type:Boolean,
			default: false
		},
		isEdit: {
			type:Boolean,
			default: false
		},	
		beforeClose: {
			type: Function,
			default:null
		},
		model:{}
	},
	data(){
		return{
			curModel:{
				user_id:"",
				name: "",
				pay: 0,
				items:[]
			},
			add:{
				name:'明细',
				value: ""
			},
			addIndex: 0
		}
	},
	computed:{
		userList:{
			get(){
				let _user = merge(true,[],this.rootMain.getUser());
				if(!this.isEdit){
					_user = _user.map(u=>{
						if(this.rootBill.bill.list.length > 0){
							let _index = this.rootBill.bill.list.filter(list=>list.user_id == u._id).length;
							if(_index>0) u.disabled = true;
						}
						return u;
					})
				}
				return _user;
			}
		}
	},
	watch:{
		"model":{
			handler:function(n,o){
				this.curModel = merge(true,this.curModel,n);
			},
			deep:true
		},
		"curModel.items":{
			handler:function(n,o){
				let _p = 0;
				if(this.curModel.items.length > 0){
					this.curModel.items.map(index=>{
						_p += Number(index.value);
					})
				}
				this.curModel.pay = _p;
			},
			deep:true
		}
	},
	methods:{
		handleInputConfirm(){
			if(this.add.value == "" || this.add.value == 0) {
				askDialogToast({msg:"明细值不能为0或空！",class:"danger",time:2000});
				return;
			}
			this.curModel.items.push(merge(true,{},this.add));
			this.addIndex++;
			this.add.name = '明细'+this.addIndex;
			this.add.value = "";
		},
		allowSubmit(){
			if(this.curModel.user_id == ""){
				askDialogToast({msg:"请选择账单拥有人!",class:"danger",time:2000});
				return false;
			}
			// if(this.curModel.items.length == 0){
			// 	askDialogToast({msg:"请创建至少一个账单!",class:"danger",time:2000});
			// 	return false;
			// }
			return true;
		},
		editBill(){
			if(!this.allowSubmit()) return;
			this.curModel.name = this.userList.filter(user=>user._id == this.curModel.user_id)[0].name;
			this.beforeClose&&this.beforeClose(this.close,this.curModel);
		},
		addBill(){
			if(!this.allowSubmit()) return;
			this.curModel.name = this.userList.filter(user=>user._id == this.curModel.user_id)[0].name;
			this.beforeClose&&this.beforeClose(this.close,this.curModel);
		},
		tagDel(index){
			this.curModel.items.splice(index,1);
		},
		close(){
			this.$emit('update:show',false);
			this.curModel = {
				user_id:"",
				name: "",
				pay: 0,
				items:[]
			};
			this.add.name = '明细';
			this.add.value = "";
		},
		modalBeforeClose(done){
			this.close();
		}
	}
}
</script>
