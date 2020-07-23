'use strict';

const TEXT_DEFAULT = 'mooooooooooooooooooooooooooo!';
const DATE_MESSAGE = '-d';

const dateNow = require('../helpers/date');

module.exports = (text = TEXT_DEFAULT) => {

	if(typeof text !== 'string')
		throw new Error('Text must be String');

	if(text !== DATE_MESSAGE)
		return text.replace(/mo/gi, 'mooooo');

	return `It's ${dateNow()} and I'm still here..`;
};
