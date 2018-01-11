<template>
	<div>
		<b-form @submit="onSubmit" @reset="onReset">
			<b-form-group id="name-form-group" 
						  label="Name *"
						  label-for="name-input"
						  v-if="!edit">
				<b-form-input id="name-input"
							  type="text"
							  @input="validateName"
							  v-model="formData.name"
							  required
							  :state="state.name.valid"
							  placeholder="Ex. Joe Blow">
				</b-form-input>
				<b-form-invalid-feedback id="name-error">
					{{ state.name.error }}
				</b-form-invalid-feedback>
			</b-form-group>
			<b-form-group id="phone-form-group" 
						  label="Phone Number *"
						  label-for="phone-input">
				<b-form-input id="phone-input"
							  type="text"
							  @input="validatePhone"
							  v-model="formData.phone"
							  :state="state.phone.valid"
							  v-mask="'(###) ###-####'"
							  placeholder="Ex. (555) 555-5555">
				</b-form-input>
				<b-form-invalid-feedback id="phone-error">
					{{ state.phone.error }}
				</b-form-invalid-feedback>
			</b-form-group>
			<b-form-group id="birthday-form-group" 
						  label="Birthday *"
						  label-for="birthday-input">
				<b-form-input id="birthday-input"
							  type="date"
							  @input="validateBirthday"
							  v-model="formData.birthday"
							  :state="state.birthday.valid"
							  required
							  placeholder="Select Data">
				</b-form-input>
				<b-form-invalid-feedback id="birthday-error">
					{{ state.birthday.error }}
				</b-form-invalid-feedback>
			</b-form-group>

			<div class="text-right buttons">
				<b-button type="submit" :disabled="isFormInvalid" variant="primary">Save</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>

import { StringValidator, DateValidator } from '@/utils/validation';
	
export default {
	props: {
		defaultValues: {
			type: Object,
			default() {
				return {
					name: '',
					phone: '',
					birthday: ''
				};
			}
		},
		submit: {
			type: Function,
			required: true
		},
		edit: Boolean,
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			this.submit(this.formData);
		},

		onReset(e) {
			e.preventDefault();
			this.formData = {...this.defaultValues};
		},

		validateName() {
			this.state.name = new StringValidator(this.formData.name)
				.required()
				.alphaSpace()
				.minLength(3)
				.maxLength(99)
				.result;
		},

		validatePhone() {
			this.state.phone = new StringValidator(this.formData.phone)
				.required()
				.phone()
				.result;
		},

		validateBirthday() {
			this.state.birthday = new DateValidator(this.formData.birthday)
				.required()
				.date()
				.min(new Date(1950, 1, 1))
				.max(new Date())
				.result;
		},
	},
	computed: {
		isFormInvalid() {
			const {name, phone, birthday} = this.state;
			return !((this.edit ? this.touched : name.valid) && phone.valid && birthday.valid);
		}
	},

	updated() {
		if (this.edit) this.touched = true;
	},

	data() {
		return {
			formData: {...this.defaultValues},
			touched: false,
			state: {
				name: {valid: this.edit || null},
				phone: {valid: this.edit || null},
				birthday: {valid: this.edit || null},
			},
		}
	},
};

</script>

<style>
	
.buttons {
	margin-top: 35px;
}

</style>
