'use strict';

const fs = require('fs').promises;

const TEMPLATE_FILE = './README.md.tpl';
const README_FILE = './README.md';

const COW_LAST_ACTION = '{{cow_last_action}}';
const LAST_TIME = '{{last_time}}';
const COW_DEFAULT = 'SO FAIL! MOOOOOOO!';

module.exports = async cow => {

	const template = await fs.readFile(TEMPLATE_FILE, { encoding: 'utf-8' });
	let newReadme = template.replace(COW_LAST_ACTION, cow || COW_DEFAULT);
	newReadme = newReadme.replace(LAST_TIME, new Date().toLocaleString('ar'));

	await fs.writeFile(README_FILE, newReadme);
};
