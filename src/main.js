// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Select,Option,OptionGroup }  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.scss'
import ASKComponents from './components/ask';
import './router/router.auth.js';
import VeeValidate from 'vee-validate'

Vue.config.keyCodes = {
  enter: 13
}

Vue.config.productionTip = false;
Vue.use(ASKComponents);
Vue.use(VeeValidate);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
