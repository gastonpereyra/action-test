'use strict';

const cowsay = require('cowsay');
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
