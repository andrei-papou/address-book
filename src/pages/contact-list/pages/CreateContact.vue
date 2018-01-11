<template>

	<b-modal id="create-contact-modal" 
			 title="Create Contact" 
			 :visible="true" 
			 :hide-footer="true" 
			 @hidden="redirectToList">
		<contact-form :edit="false" :submit="submit">
		</contact-form>
	</b-modal>

</template>

<script>

import moment from 'moment';
import { mapActions } from 'vuex';
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
	methods: {
		redirectToList() {
			this.$router.push({ name: 'index' });
		},

		submit(data) {
			data.birthday = moment(data.birthday, 'YYYY-MM-DD').format('MM/DD/YYYY');
			this.createContact(data);
			this.redirectToList();
		},

		...mapActions(['createContact']),
	},

	mounted() {
		this.setBackgroundBlur(true);
	},

	beforeDestroy() {
		this.setBackgroundBlur(false);
	}

};

</script>

<style>
	
</style>
