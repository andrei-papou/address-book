import Vue from 'vue';
import store from '@/store';
import router from '@/routes';
import EditContact from '@/pages/contact-list/pages/EditContact';
import { mockFetch } from '../../../../mock.js';

describe('EditContact.vue', () => {

	let vm;
	const Constructor = Vue.extend(EditContact);

	beforeEach(() => {
		mockFetch({ ok: true, json: () => Promise.resolve([]) });
		vm = new Constructor({ 
			store, 
			router,
			propsData: {
				setBackgroundBlur: () => {}
			}
		}).$mount();
	});

	it('should render correct dom elements', () => {
		expect(vm.$el.querySelector('div.modal-dialog.modal-md')).toBeTruthy();
	});

	it('should contain redirectToList method with expected behavior', () => {
		vm.$router.push = jest.fn();
		vm.redirectToList();
		expect(vm.$router.push).toHaveBeenCalledWith({ name: 'index' });
	});

	it('should contain submit method with expected behavior', () => {
		const data = { birthday: '2017-10-10' };
		vm.updateContact = jest.fn();
		vm.redirectToList = jest.fn();
		vm.submit(data);
		expect(vm.updateContact).toHaveBeenCalledWith({ birthday: '10/10/2017' });
		expect(vm.redirectToList).toHaveBeenCalled();
	});

	it('should contain beforeDestroy method with expected behavior', () => {
		vm.setBackgroundBlur = jest.fn();
		vm.$destroy();
		expect(vm.setBackgroundBlur).toHaveBeenCalledWith(false);
	});

});
