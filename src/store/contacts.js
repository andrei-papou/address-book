import moment from 'moment';
import Vue from 'vue';
import contactsApi from '@/api/contacts';
import {
	CONTACTS_LIST,
	CONTACTS_EDIT,
	CONTACTS_CREATE,
} from './mutation-types';


const state = {
	all: [],
};

export const actions = {
	getContacts({ commit }) {
		return contactsApi.getContactList()
			.then(response => commit(CONTACTS_LIST, response))
			.catch(error => console.error(error));
	},

	createContact({ commit }, contactData) {
		return contactsApi.createContact(contactData)
			.then(() => commit(CONTACTS_CREATE, contactData))
			.catch(err => console.log(err));
	},

	updateContact({ commit }, updatedObj) {
		commit(CONTACTS_EDIT, updatedObj);
	},
};

export const mutations = {
	[CONTACTS_LIST](state, contacts) {
		contacts.forEach(c => c.birthday = moment(c.birthday, 'YYYY-MM-DD').format('MM/DD/YYYY'));
		state.all = contacts;
	},

	[CONTACTS_CREATE](state, newObj) {
		state.all.push(newObj);
	},

	[CONTACTS_EDIT](state, updatedObj) {
		const index = state.all.findIndex(c => c.name === updatedObj.name);
		Vue.set(state.all, index, Object.assign({}, state.all[index], updatedObj));
	}
};

const getters = {
	allContacts: state => state.all,
	getContactByName: state => name => state.all.find(c => c.name === name),
};

export default {
	state,
	actions,
	mutations,
	getters
};
