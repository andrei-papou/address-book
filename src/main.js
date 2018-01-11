import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
import { sync } from 'vuex-router-sync';
import App from './App';
import store from './store';
import router from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

sync(store, router);

Vue.use(BootstrapVue);
Vue.use(VueTheMask);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	router,
	store,
	components: { App }
});
