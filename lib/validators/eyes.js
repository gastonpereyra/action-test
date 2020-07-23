'use strict';

const eyesTypes = require('../helpers/eyes-type');

const EYES_DEFAULT = 'm';

module.exports = (eyes = EYES_DEFAULT) => {

	if(typeof eyes !== 'string')
		throw new Error('Eyes must be String');

	if(!eyesTypes[eyes])
		throw new Error('Invalid Eyes type');

	return eyesTypes[eyes];
};
