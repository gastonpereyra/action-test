'use strict';

const assert = require('assert');
const sinon = require('sinon');

const parseArgs = require('../lib/parse-args');

const eyesTypes = require('../lib/helpers/eyes-type');
const tongueTypes = require('../lib/helpers/tongue-type');

describe('Parse Args', () => {

	context('When Invalid params are passed', () => {

		const errorValues = {
			eyes: 'xx',
			tongue: 'U'
		};

		it('Should return error values if text is not string', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, 1]), {
				...errorValues,
				text: 'Text must be String'
			});
		});

		it('Should return error values if eyes is not string', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, 1]), {
				...errorValues,
				text: 'Eyes must be String'
			});
		});

		it('Should return error values if tongue is not string', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, undefined, 1]), {
				...errorValues,
				text: 'Tongue must be String'
			});
		});

		it('Should return error values if eyes is not some eye type', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, 'not-type']), {
				...errorValues,
				text: 'Invalid Eyes type'
			});
		});

		it('Should return error values if tongue is not some tongue type', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, undefined, 'not-type']), {
				...errorValues,
				text: 'Invalid Tongue type'
			});
		});
	});

	context('When valid text param are passed', () => {

		const validValues = {
			eyes: 'oo',
			tongue: ''
		};

		it('Should return text and default values for eyes and tongue values', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, 'example']), {
				...validValues,
				text: 'example'
			});
		});

		it('Should return with extra \'moooo\' and default values for eyes and tongue values if some \'mo\' character is passed', () => {
			assert.deepStrictEqual(parseArgs([undefined, undefined, 'more moon']), {
				...validValues,
				text: 'mooooore moooooon'
			});
		});

		it('Should return text with date time and default values for eyes and tongue values if \'-d\' is passed', () => {

			const clock = sinon.useFakeTimers();

			assert.deepStrictEqual(parseArgs([undefined, undefined, '-d']), {
				...validValues,
				text: 'It\'s Thursday, January 1, 1970 and I\'m still here..'
			});

			clock.restore();
		});
	});

	context('When valid eyes param are passed', () => {

		const validValues = {
			text: 'mooooooooooooooooooooooooooooooo!',
			tongue: ''
		};

		Object.entries(eyesTypes).forEach(([type, eyes]) => {

			it(`Should return correct eyes '${eyes}' and default values for text and tongue values if '${type}' is passed`, () => {
				assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, type]), {
					...validValues,
					eyes
				});
			});
		});
	});

	context('When valid tongue param are passed', () => {

		const validValues = {
			text: 'mooooooooooooooooooooooooooooooo!',
			eyes: 'oo'
		};

		Object.entries(tongueTypes).forEach(([type, tongue]) => {

			it(`Should return correct tongue '${tongue}' and default values for text and eyes values if '${type}' is passed`, () => {
				assert.deepStrictEqual(parseArgs([undefined, undefined, undefined, undefined, type]), {
					...validValues,
					tongue
				});
			});
		});
	});
});
