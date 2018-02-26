import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Detail from '@/views/detail/detail'
import User from '@/views/user/user'

const APP_ROUTERS = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: { title: 'ask-bill', requiresAuth:  false}
	},
	{
		path: '/detail/:billId/:userId',
		name: 'detail',
		component: Detail,
		meta: { title: 'ask-bill-detail', requiresAuth:  false}
	},
	{
		path: '/user',
		name: 'user',
		component: User,
		meta: { title: '用户操作', requiresAuth:  false}
	}
];

Vue.use(Router)
export default new Router({
	// mode: 'history',
	routes: APP_ROUTERS
})
