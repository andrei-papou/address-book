import Vue from 'vue';
import App from '@/App';
import store from '@/store';
import router from '@/routes';
import { mockFetch } from '../mock.js';

describe('App.vue', () => {

	let vm;
	const Constructor = Vue.extend(App);

	beforeEach(() => {
		mockFetch({ ok: true, json: () => Promise.resolve([]) });
		vm = new Constructor({ store, router }).$mount();
	});

	it('should render correct dom elements', () => {
		expect(vm.$el).toMatchSnapshot();
	});

});
