import { mutations, actions } from '@/store/contacts';
import { CONTACTS_LIST, CONTACTS_CREATE, CONTACTS_EDIT } from '@/store/mutation-types';
import { mockFetch, mockFetchFail } from '../../mock';

describe('contacts store', () => {

	test('contacts-list mutation', () => {
		const state = { all: [] };
		const contacts = [
			{ birthday: '2017-01-01' },
			{ birthday: '2018-01-01' }
		];
		mutations[CONTACTS_LIST](state, contacts);
		expect(state.all).toEqual([
			{ birthday: '01/01/2017' },
			{ birthday: '01/01/2018' },
		]);
	});

	test('contacts-create mutation', () => {
		const state = { all: [] };
		const obj = { some: 'field' };
		mutations[CONTACTS_CREATE](state, obj);
		expect(state.all).toEqual([obj]);
	});

	test('contacts-edit mutation', () => {
		const state = { all: [{ name: 'a', value: 1 }] };
		const upd = { name: 'a', value: 2 };
		mutations[CONTACTS_EDIT](state, upd);
		expect(state.all).toEqual([upd]);
	});

	test('getContacts action', () => {
		mockFetch({ ok: true, json: () => Promise.resolve([]) });
		let commit = jest.fn();
		actions.getContacts({ commit }).then(() => {
			expect(commit).toHaveBeenCalledWith(CONTACTS_LIST, []);
		});
		mockFetch({ ok: false, json: () => Promise.resolve('') });
		commit = jest.fn();
		actions.getContacts({ commit }).then(() => {
			expect(commit).not.toHaveBeenCalled();
		});
	});

	test('createContact action', () => {
		mockFetch({});
		let commit = jest.fn();
		const data = 'data';
		actions.createContact({ commit }, data).then(() => {
			expect(commit).toHaveBeenCalledWith(CONTACTS_CREATE, data);
		});
		mockFetchFail('');
		actions.createContact({ commit }, data).then(() => {
			expect(commit).not.toHaveBeenCalled();
		});
	});

	test('updateContact action', () => {
		const commit = jest.fn();
		actions.updateContact({ commit }, 'data');
		expect(commit).toHaveBeenCalledWith(CONTACTS_EDIT, 'data');
	});

});
