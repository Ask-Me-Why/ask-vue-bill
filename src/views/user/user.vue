<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ask-view-box.user {
	text-align: center;
	.ask-button {
		margin: 20px 0;
	}
}

</style>
<template>
	<div class="ask-view has-bar" v-nav="{hideNavBar:false}">
		<div class="ask-view-box user">
			<div class="boundary">
				<div>
					{{user}}
				</div>
				<div>
					<ask-button @ask-click="createUser">创建所有用户</ask-button>
				</div>
				<div>
					<ask-button @ask-click="removeUser">删除所有用户</ask-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { User } from '@/services';
import { merge, askDialogToast, askDialogConfirm } from '@/utils';
import moment from 'moment/moment.js';
export default {
	name: 'User',
	inject: ['rootMain'],
	data() {
		return {
			user: []
		}
	},
	mounted() {
		this.user = [{
			name: "陈龙",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		},{
			name: "王平",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		},{
			name: "李方杨",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		},{
			name: "刘昆",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		},{
			name: "唐世林",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		},{
			name: "杨思亮",
			logo: "http://static.699pic.com/images/index/pet-img.png",
			sex: "公"
		}]
	},
	methods:{
		createUser(){
			const userServer = new User();
			this.rootMain.loader(true);
			userServer.create(this.user).then(r=>{
				this.rootMain.loader(false);
				askDialogToast({msg:"用户创建成功",class:"success",time:2000});
			},error=>{
				this.rootMain.loader(false);
				askDialogToast({msg:"用户创建失败",class:"danger",time:2000});
			})
		},
		removeUser(){
			const userServer = new User();
			this.rootMain.loader(true);
			userServer.remove().then(r=>{
				this.rootMain.loader(false);
				askDialogToast({msg:"用户删除成功",class:"success",time:2000});
			},error=>{
				this.rootMain.loader(false);
				askDialogToast({msg:"用户删除失败",class:"danger",time:2000});
			})
		}
	}
}

</script>
