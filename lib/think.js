'use strict';

const cowsay = require('cowsay');
const parseArgs = require('./parse-args');

const {
    text,
    eyes,
    tongue
} = parseArgs(process.argv);

console.log(cowsay.think({
	text,
	e : eyes,
	T : tongue
}));

