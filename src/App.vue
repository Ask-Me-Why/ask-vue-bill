<template>
	<div id="app" class="container">
		<nav-bar></nav-bar>
		<router-view></router-view>
		<ask-loader :show="show"></ask-loader>
	</div>
</template>
<style src="./assets/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
<style lang="scss">
	
	/* 进入过渡的状态 */

	.bill-modal-slide-enter-active {
		animation: bill-modal-slide-enter .8s cubic-bezier(.4, 0, 0, 1.5) both 1;
	}
	@keyframes bill-modal-slide-enter{
		0% {
			transform: translate3d(0,-200px,0);
			opacity: 0;
		}
		100%{
			transform: translate3d(0,0,0);
			opacity: 1;
		}
	}

	/* 离开过渡的状态 */

	.bill-modal-slide-leave-active {
		animation: bill-modal-slide-leave .8s cubic-bezier(.4, 0, 0, 1.5) both 1;
	}
	@keyframes bill-modal-slide-leave{
		0%{
			transform: translate3d(0,0,0);
			opacity: 1;
		}
		100% {
			transform: translate3d(0,-200px,0);
			opacity: 0;
		}
	}

	/* @keyframes rubberBand {
		0% {
			transform: scaleX(1);
		}
		30% {
			transform: scale3d(1.25, .75, 1);
		}
		40% {
			transform: scale3d(.75, 1.25, 1);
		}
		50% {
			transform: scale3d(1.15, .85, 1);
		}
		65% {
			transform: scale3d(.95, 1.05, 1);
		}
		75% {
			transform: scale3d(1.05, .95, 1);
		}
		to {
			transform: scaleX(1);
		}
	} */
</style>
<script>
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import Vue from 'vue';
import channel from '@/components/core/nav-bar/channel.js';
import navBar from '@/components/core/nav-bar/nav-bar.vue';
import { User } from '@/services';

Vue.directive('nav',{
	inserted: function(el,binding){
		let data = binding.value;
		channel.$emit('UpdateNavBar',data);
	}
})
export default {
	name: 'app',
	provide() {
		return {
			rootMain: this
		};
	},
	components:{
		'nav-bar':navBar
	},
	data() {
		return {
			show: false,
			index: 0,
			userInfo: []
		}
	},
	mounted(){
		const userServer = new User();
		this.loader(true);
		userServer.all().then(r=>{
			this.userInfo = r.data;
			this.loader(false);
		},error=>{
			this.loader(false);
		})
	},
	watch: {
		'$route' (to, from) {
			askOverlay.closeAll();
		}
	},
	methods: {
		/**
		 * 加载等待框
		 * @Author   陈龙
		 * @DateTime 2017-11-27
		 * @version  [version]
		 * @param    {[type]}   state Boolean: true|false true代表打开加载等待，false代表关闭加载等待
		 */
		loader(state) {
			if (state) {
				if (this.index == 0) this.show = true;
				this.index++;
			} else {
				this.index--;
				if (this.index == 0) this.show = false;
			}
		},
		getUser(){
			return this.userInfo;
		}
	}
}

</script>
