import Vue from 'vue';
import store from '@/store';
import router from '@/routes';
import ContactList from '@/pages/contact-list/ContactList';
import { mockFetch } from '../../../mock.js';

describe('ContactList.vue', () => {

	let vm;
	const Constructor = Vue.extend(ContactList);

	beforeEach(() => {
		mockFetch({ ok: true, json: () => Promise.resolve([]) });
	});

	it('should render correct dom elements', () => {
		vm = new Constructor({ store, router }).$mount();
		expect(vm.$el.querySelector('.container')).toBeTruthy();
		expect(vm.$el.querySelector('a[href="/create"]')).toBeTruthy();
		expect(vm.$el.querySelector('tr')).toBeTruthy();
		expect(vm.$el).toMatchSnapshot();
	});

	it('should contain setBackgroundBlur method with correct behavior', () => {
		vm = new Constructor({ store, router }).$mount();
		expect(typeof vm.setBackgroundBlur).toEqual('function');
		expect(vm.backgroundBlur).toBeFalsy();
		vm.setBackgroundBlur(true);
		expect(vm.backgroundBlur).toBeTruthy();
	});

	it('should contain mounted hook with correct behavior', () => {
		vm = new Constructor({ store, router })
		vm.getContacts = jest.fn();
		vm.$mount();
		expect(vm.getContacts).toHaveBeenCalled();
	});

});
