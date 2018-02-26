<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.input-time{
		@include flexLayout(flex,normal,center);
		.text{
			display: inline-block;
			font-size: 1.6rem;
			color: map-get($color,A100);
			margin: 0 4px;
		}
	}
</style>
<template>
	<div class="input-time">
		<input-number :type="'year'" 
					  @number-change="onChange" 
					  :val="curTime.year" 
					  :min="2000">
		</input-number>
		<div class="text">年</div>
		<input-number :type="'month'" 
					  @number-change="onChange" 
					  :val="(curTime.month + 1)" 
					  :min="1" 
					  :max="12">
		</input-number>
		<div class="text">月</div>
		<input-number :type="'date'" 
					  @number-change="onChange" 
					  :val="curTime.date" 
					  :min="1" 
					  :max="maxDay">
		</input-number>
		<div class="text">日</div>
		<input-number :type="'hours'" 
					  @number-change="onChange" 
					  :val="curTime.hours" 
					  :min="0" 
					  :max="23">
		 </input-number>
		<div class="text">时</div>
		<input-number :type="'minutes'" 
					  @number-change="onChange" 
					  :val="curTime.minutes" 
					  :min="0" 
					  :max="59">
		</input-number>
		<div class="text">分</div>

		<input-number :type="'seconds'" 
					  @number-change="onChange" 
					  :val="curTime.seconds" 
					  :min="0" 
					  :max="59">
		</input-number>
		<div class="text">秒</div>
	</div>
</template>
<script>
	import inputNumber from './input-number.vue';
	import moment from 'moment/moment.js';
	export default{
		name:"InputTime",
		props:['time'],
		components:{
			"input-number":inputNumber
		},
		data(){
			return{
				curTime:{
					year: null,
					month: null,
					date: null,
					hours:null,
					minutes:null,
					seconds:null,
					moment: null
				},
				maxDay: 31
			}
		},
		mounted(){
			let _m = moment(this.time);
			this.maxDay = _m.daysInMonth();
			this.curTime = {
				year: _m.get('year'),
				month: _m.get('month'),
				date: _m.get('date'),
				hours:_m.get('hours'),
				minutes:_m.get('minutes'),
				seconds:_m.get('seconds'),
				moment: _m
			}
		},
		watch:{
			time(n,o){
				let _m = moment(this.time);
				this.maxDay = _m.daysInMonth();
				this.curTime = {
					year: _m.get('year'),
					month: _m.get('month'),
					date: _m.get('date'),
					hours:_m.get('hours'),
					minutes:_m.get('minutes'),
					seconds:_m.get('seconds'),
					moment: _m
				}
			}
		},
		methods:{
			onChange(val,type){
				if(type == 'year'){
					let _m = moment(this.curTime.moment);
					_m.set('date',1);
					_m.set('year',val);
					_m.set('month',this.curTime.moment.get('month'));
					let _day = parseInt(this.curTime.moment.get('date'), 10);
					this.maxDay = _m.daysInMonth();
					if(_day > this.maxDay){
						this.curTime.moment.set('date',this.maxDay);
						this.curTime.moment.set(type,val);
						this.curTime['date'] = this.maxDay;
						this.curTime[type] = val;
					}else{
						this.curTime.moment.set(type,val);
						this.curTime[type] = val;
					}
				}else if(type == 'month'){
					let _m = moment(this.curTime.moment);
					_m.set('date',1);
					_m.set('month',val-1);
					let _day = parseInt(this.curTime.moment.get('date'), 10);
					this.maxDay = _m.daysInMonth();
					if(_day > this.maxDay){
						this.curTime.moment.set('date',this.maxDay);
						this.curTime.moment.set(type,val-1);
						this.curTime['date'] = this.maxDay;
						this.curTime[type] = val-1;
					}else{
						this.curTime[type] = val-1;
						this.curTime.moment.set(type,val-1);
					}
				}else{
					this.curTime[type] = val;
					this.curTime.moment.set(type,val);
				}
				this.$emit('select',this.curTime.moment.format("YYYY-MM-DD HH:mm:ss"));
			}
		}
	}
</script>