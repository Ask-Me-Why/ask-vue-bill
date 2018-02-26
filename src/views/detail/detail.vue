<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.group{
		width: 100%;
		padding: 5px 0;
		@include flexLayout(flex,normal,normal);
		.name{
			min-width: 100px;
			font-size: 20px;
			color: map-get($color,100);
		}
		.value{
			font-size: 20px;
			color: map-get($color,100);
		}
	}
	.bill-detail{
		padding-top: 20px;
	}
</style>
<template>
	<div class="ask-view has-bar" v-nav="{hideNavBar:false}">
		<div class="ask-view-box home">
			<div class="boundary">
				<div class="group">
					<div class="name">账单名称:</div>
					<div class="value">{{bill&&bill.name}}</div>
				</div>
				<div class="group">
					<div class="name">持有人:</div>
					<div class="value">{{list&&list.name}}</div>
				</div>
				<bill-detail :list="list"></bill-detail>
			</div>
		</div>
	</div>
</template>
<script>
import { Bill } from '@/services';
import billDetail from '@core/bill/bill-detail.vue';
export default {
	name: 'Detail',
	inject:['rootMain'],
	components:{
		'bill-detail':billDetail
	},
	data(){
		return{
			bill:null
		}
	},
	computed:{
		list(){
			return this.bill&&this.bill.list&&this.bill.list.filter(l=>l.user_id == this.$route.params.userId)[0]||{};
		}
	},
	mounted() {
		const billServer = new Bill();
		this.rootMain.loader(true);
		billServer.queryById(this.$route.params.billId).then(r=>{
			this.rootMain.loader(false);
			let _r = r.data;
			_r.list = JSON.parse(_r.list);
			this.bill = _r;
		},error=>{
			this.rootMain.loader(false);
		})
	},
	methods:{
		updateBill(index,model){
			this.$set(this.bill.list,index,model);
		}
	}
}

</script>
