import Vue from 'vue';
import TopBar from '@/components/TopBar';

describe('TopBar.vue', () => {

	let vm;
	const Constructor = Vue.extend(TopBar);

	beforeEach(() => {
		vm = new Constructor().$mount();
	});

	it('should render correct contents', () => {
		expect(vm.$el.querySelector('.container')).toBeTruthy();
		expect(vm.$el.querySelector('img')).toBeTruthy();
	});

});
