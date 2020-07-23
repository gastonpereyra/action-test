'use strict';

const tongueTypes = require('../helpers/tongue-type');

const TONGUE_DEFAULT = 'in';

module.exports = (tongue = TONGUE_DEFAULT) => {

	if(typeof tongue !== 'string')
		throw new Error('Tongue must be String');

	if(tongue !== TONGUE_DEFAULT && !tongueTypes[tongue])
		throw new Error('Invalid Tongue type');

	return tongueTypes[tongue];
};
