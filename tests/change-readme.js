'use strict';

const assert = require('assert');
const sinon = require('sinon');

const fs = require('fs').promises;
const cowsay = require('cowsay');

const changeReadme = require('../lib/change-readme');

describe('Change Readme', () => {

	afterEach(() => {
		sinon.restore();
	});

	const TEMPLATE_FILE = './README.md.tpl';
	const README_FILE = './README.md';
	const encoding = { encoding: 'utf-8' };
	const template = '{{cow_last_action}}';
	const cow = cowsay.say({ text: 'test' });

	context('When somethings fails', () => {

		it('Should reject if cannot open Template file', async () => {

			sinon.stub(fs, 'readFile').rejects(new Error('File Not Found'));
			sinon.stub(fs, 'writeFile');

			await assert.rejects(changeReadme(cow), { message: 'File Not Found' });

			sinon.assert.calledOnceWithExactly(fs.readFile, TEMPLATE_FILE, encoding);
			sinon.assert.notCalled(fs.writeFile);
		});

		it('Should reject if cannot write Readme file', async () => {

			sinon.stub(fs, 'readFile').returns(template);
			sinon.stub(fs, 'writeFile').rejects(new Error('Cannot write file'));

			await assert.rejects(changeReadme(cow), { message: 'Cannot write file' });

			sinon.assert.calledOnceWithExactly(fs.readFile, TEMPLATE_FILE, encoding);
			sinon.assert.calledOnceWithExactly(fs.writeFile, README_FILE, cow);
		});
	});

	context('When Everything works', () => {

		it('Should replace template and write file with cow says', async () => {

			sinon.stub(fs, 'readFile').returns(template);
			sinon.stub(fs, 'writeFile');

			await changeReadme(cow);

			sinon.assert.calledOnceWithExactly(fs.readFile, TEMPLATE_FILE, encoding);
			sinon.assert.calledOnceWithExactly(fs.writeFile, README_FILE, cow);
		});

		it('Should replace template and write file with default if cow not passed', async () => {

			sinon.stub(fs, 'readFile').returns(template);
			sinon.stub(fs, 'writeFile');

			await changeReadme();

			sinon.assert.calledOnceWithExactly(fs.readFile, TEMPLATE_FILE, encoding);
			sinon.assert.calledOnceWithExactly(fs.writeFile, README_FILE, 'SO FAIL! MOOOOOOO!');
		});

		it('Should not replace template and write file if not placeholder are found', async () => {

			sinon.stub(fs, 'readFile').returns('No cows here');
			sinon.stub(fs, 'writeFile');

			await changeReadme();

			sinon.assert.calledOnceWithExactly(fs.readFile, TEMPLATE_FILE, encoding);
			sinon.assert.calledOnceWithExactly(fs.writeFile, README_FILE, 'No cows here');
		});
	});
});
