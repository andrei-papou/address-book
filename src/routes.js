import Vue from 'vue';
import Router from 'vue-router';
import ContactList from '@/pages/contact-list/ContactList';
import CreateContact from '@/pages/contact-list/pages/CreateContact';
import EditContact from '@/pages/contact-list/pages/EditContact';


Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: ContactList,
			children: [
				{
					path: ':id/edit',
					name: 'edit-contact',
					component: EditContact,
				},
				{
					path: 'create',
					name: 'create-contact',
					component: CreateContact,
				}
			]
		}
	]
});
