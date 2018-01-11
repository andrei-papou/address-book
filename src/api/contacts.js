import { API_HOST } from './conf';

export default {

	getContactList() {
		return fetch(`${API_HOST}/contacts`)
			.then(res => Promise.all([res, res.json()]))
			.then(([res, json]) => res.ok ? json : Promise.reject(json));
	},

	createContact(data) {
		return fetch(`${API_HOST}/contacts`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	},

};
