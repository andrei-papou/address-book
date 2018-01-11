import Vue from 'vue';
import ContactForm from '@/components/ContactForm';

describe('ContactForm.vue', () => {

	let vm;
	const Constructor = Vue.extend(ContactForm);

	beforeEach(() => {
		vm = new Constructor({ propsData: { edit: false, submit: () => {} } }).$mount();
	});

	it('should render correct contents', () => {
		expect(vm.$el.querySelector('#name-input')).toBeTruthy();
		expect(vm.$el.querySelector('#phone-input')).toBeTruthy();
		expect(vm.$el.querySelector('#birthday-input')).toBeTruthy();
		expect(vm.$el.querySelector('#name-form-group')).toBeTruthy();
		expect(vm.$el.querySelector('#phone-form-group')).toBeTruthy();
		expect(vm.$el.querySelector('#birthday-form-group')).toBeTruthy();
	});

	it('should have onSubmit method with expected behavior', () => {
		expect(typeof ContactForm.methods.onSubmit).toBe('function');
		vm.submit = jest.fn();
		const e = {
			preventDefault: jest.fn()
		};
		vm.onSubmit(e);
		expect(e.preventDefault).toHaveBeenCalled();
		expect(vm.submit).toHaveBeenCalled();
	});

	it('should have onReset method with correct behavior', () => {
		expect(typeof ContactForm.methods.onReset).toBe('function');
		const e = {
			preventDefault: jest.fn()
		};
		vm.defaultValues = { a: 1 };
		vm.onReset(e);
		expect(e.preventDefault).toHaveBeenCalled();
		expect(vm.formData).toEqual(vm.defaultValues);
	});

	it('should have validateName method with correct behavior', () => {
		expect(typeof ContactForm.methods.validateName).toBe('function');
		vm.formData.name = '';
		vm.validateName();
		expect(vm.state.name.valid).toBeFalsy();
		expect(vm.state.name.error).toBeTruthy();
		vm.formData.name = 'Jack';
		vm.validateName();
		expect(vm.state.name.valid).toBeTruthy();
		expect(vm.state.name.error).toBeFalsy();
	});

	it('should have validatePhone method with correct behavior', () => {
		expect(typeof ContactForm.methods.validatePhone).toBe('function');
		vm.formData.phone = '23213';
		vm.validatePhone();
		expect(vm.state.phone.valid).toBeFalsy();
		expect(vm.state.phone.error).toBeTruthy();
		vm.formData.phone = '(333) 333-3333';
		vm.validatePhone();
		expect(vm.state.phone.valid).toBeTruthy();
		expect(vm.state.phone.error).toBeFalsy();
	});

	it('should have validateBirthday method with correct behavior', () => {
		expect(typeof ContactForm.methods.validateBirthday).toBe('function');
		vm.formData.birthday = 'date';
		vm.validateBirthday();
		expect(vm.state.birthday.valid).toBeFalsy();
		expect(vm.state.birthday.error).toBeTruthy();
		vm.formData.birthday = '2015-10-20';
		vm.validateBirthday();
		expect(vm.state.birthday.valid).toBeTruthy();
		expect(vm.state.birthday.error).toBeFalsy();
	});

	it('should make the form on first update if edit', () => {
		vm = new Constructor({ propsData: { edit: true, submit: () => {} } }).$mount();
		expect(vm.isFormInvalid).toBeTruthy();
		vm.$forceUpdate();
		expect(vm.isFormInvalid).toBeTruthy();
	})

});
