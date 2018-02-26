/*
* @Author: askMeWhy
* @Date:   2017-12-04 18:22:13
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-15 15:17:32
*/
export default {
	computed:{
		averagePrice:{
			get(){
				let _p = 0;
				if(this.bill && this.bill.list.length > 0){
					_p = this.allPrice/this.bill.list.length;
				}else{
					_p = this.allPrice;
				}
				return _p;
			}
		},
		allPrice(){
			let _p = 0;
			if(this.bill && this.bill.list.length > 0){
				this.bill.list.map(index=>{
					_p += Number(index.pay);
				})
			}
			return _p;
		}
	}
}
