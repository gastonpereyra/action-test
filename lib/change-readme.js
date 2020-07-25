'use strict';

const fs = require('fs').promises;

const TEMPLATE_FILE = './README.md.tpl';
const README_FILE = './README.md';

const COW_LAST_ACTION = '{{cow_last_action}}';
const COW_DEFAULT = 'SO FAIL! MOOOOOOO!';

module.exports = async cow => {

	const template = await fs.readFile(TEMPLATE_FILE, { encoding: 'utf-8' });
	const newReamde = template.replace(COW_LAST_ACTION, cow || COW_DEFAULT);

	await fs.writeFile(README_FILE, newReamde);
};
