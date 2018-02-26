/*
* @Author: askMeWhy
* @Date:   2017-11-28 16:39:29
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-13 15:49:04
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './bill-form.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const addBillForm = (onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.isEdit = false;
	vm.$on('onclose', () => {
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}

export const editBillForm = (model,onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.isEdit = true;
	vm.model = model;
	vm.$on('onclose', () => {
		vm.close();
		if(onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
