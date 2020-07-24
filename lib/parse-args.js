'use strict';

const validateText = require('./validators/text');
const validateEyes = require('./validators/eyes');
const validateTongue = require('./validators/tongue');

module.exports = args => {

	const [,, text, eyes, tongue] = args;

	try {

		return {
			text: validateText(text),
			eyes: validateEyes(eyes),
			tongue: validateTongue(tongue)
		};

	} catch(error) {

		return {
			text: error.message,
			eyes: validateEyes('rip'),
			tongue: validateTongue('l')
		};
	}
};
