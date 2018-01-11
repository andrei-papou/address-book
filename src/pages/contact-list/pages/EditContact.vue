<template>
	
	<b-modal id="edit-contact-modal" 
			 title="Edit Contact" 
			 :visible="true" 
			 :hide-footer="true" 
			 @hidden="redirectToList">
		<contact-form :default-values="getContact()" 
					  :edit="true" 
					  :submit="submit">
		</contact-form>
	</b-modal>

</template>

<script>

import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import ContactForm from '@/components/ContactForm';
	
export default {
	components: {
		ContactForm,
	},
	props: {
		setBackgroundBlur: {
			type: Function,
			required: true
		}
	},
	computed: {
		...mapGetters(['getContactByName']),
	},
	methods: {
		...mapActions(['updateContact']),

		redirectToList() {
			this.$router.push({ name: 'index' });
		},

		getContact() {
			const contact = {...this.getContactByName(this.$route.params.id)};
			contact.birthday = moment(contact.birthday, 'MM/DD/YYYY').format('YYYY-MM-DD');
			return contact;
		},

		submit(updatedObj) {
			updatedObj.birthday = moment(updatedObj.birthday, 'YYYY-MM-DD').format('MM/DD/YYYY');
			this.updateContact(updatedObj);
			this.redirectToList();
		},
	},

	mounted() {
		this.setBackgroundBlur(true);
	},

	beforeDestroy() {
		this.setBackgroundBlur(false);
	}
}

</script>

<style>
</style>
