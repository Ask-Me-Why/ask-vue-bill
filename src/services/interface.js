import {
	ajax,
	askDialogToast,
	sessionStorage,
	localStorage,
	merge
} from '@/utils';

import router from '@/router';
import * as config from '@/config.js';

const baseURL = config.BASE_URL;
let testId = 1;
export class User{
	all(){
		return this._ajax('get',{});
	}
	create(opt){
		let options = opt;
		return this._ajax('post',options);
	}
	remove(){
		return this._ajax('delete');
	}

	_ajax(method,options,id){
		options = options || {};
		return ajax({
			method: method,
			url: `${baseURL}/user${id !== void 0 ? '/'+id:''}`,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
			}
		});
	}
}
export class Bill{
	list(){
		return testId;
	}
	addList(){
		testId++;
		return testId;
	}
	all(){
		return this._ajax('get',{});
	}
	queryById(id){
		return this._ajax('get',{},id);
	}
	create(opt){
		/*let options = {
			name: '12',
			create: '12',
			list:[
				{
					user_id: 1,
					pay: 100,
					items:[
						{
							id: 1,
							name:'a',
							value: 10
						},
						{
							id: 1,
							name:'a',
							value: 90
						}
					]
				}
			]
		}
		options.list = JSON.stringify(options.list);*/
		let options = {
			name: '',
			create: '',
			list:''
		}
		options = merge(true,options,opt);
		options.list = JSON.stringify(options.list);
		return this._ajax('post',options);
	}
	update(id,opt){
		let options = {
			name: '',
			create: '',
			list:''
		}
		options = merge(true,options,opt);
		options.list = JSON.stringify(options.list);
		return this._ajax('put',options,id);
	}
	remove(id){
		return this._ajax('delete',{},id);
	}

	_ajax(method,options,id){
		options = options || {};
		return ajax({
			method: method,
			url: `${baseURL}/bill${id !== void 0 ? '/'+id:''}`,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
			}
		});
	}
}
