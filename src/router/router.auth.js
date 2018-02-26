import router from './index.js'
import { refreshTitle } from '@/utils';
import Vue from 'vue';

const beforeEach = (to, from, next) => {
	console.log(233)
	if(to.meta.title){
		refreshTitle(to.meta.title);
	}else{
		refreshTitle('Ask-Me-Why');
	}
	next();
};

const afterEach = (toRoute, fromRoute) => {
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)