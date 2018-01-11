import moment from 'moment';

class Validator {

	constructor(value) {
		this.value = value;
		this.error = null;
	}

	get result() {
		return {
			error: this.error,
			valid: !this.error,
		}
	}

	_validate(errorCallback, message) {
		if (this.error) return this;
		if (errorCallback()) this.error = message;
		return this;
	}

	required(message = 'This field is required') {
		return this._validate(() => !this.value && this.value !== 0, message);
	}

}

export class StringValidator extends Validator {

	constructor(value) {
		super(value);
	}

	alphaSpace(message = 'String chars should be alphas or spaces') {
		return this._validate(() => !/^[a-zA-Z\s]+$/.test(this.value), message);
	}

	minLength(length, message = `The string should be longer than ${length}`) {
		return this._validate(() => this.value.length < length, message);
	}

	maxLength(length, message = `The string should be shorter than ${length}`) {
		return this._validate(() => this.value.length > length, message);
	}

	phone(message = 'The value should be in (XXX) XXX-XXXX format.') {
		return this._validate(() => !/^\(\d{3}\) \d{3}-\d{4}$/.test(this.value), message);
	}

}

export class DateValidator extends Validator {

	constructor(value) {
		super(moment(value, 'YYYY-MM-DD'));
	}

	date(message = 'Should be valid date') {
		return this._validate(() => !this.value.isValid(), message);
	}

	min(date, message = `Should be greater than ${moment(date).format('MM/DD/YYYY')}`) {
		return this._validate(() => this.value < date, message);
	}

	max(date, message = `Should be less than ${moment(date).format('MM/DD/YYYY')}`) {
		return this._validate(() => this.value > date, message);
	}

}
