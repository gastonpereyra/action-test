'use strict';

const cowsay = require('cowsay');

const changeReamde = require('./change-readme');
const parseArgs = require('./parse-args');

const {
	text,
	eyes,
	tongue
} = parseArgs(process.argv);

const cow = cowsay.say({
	text,
	e: eyes,
	T: tongue
});

console.log(cow);

try {
	changeReamde(cow);
} catch(err) {
	console.error('Warning!!: Cannot change README', err.message);
}
