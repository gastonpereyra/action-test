'use strict';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

module.exports = () => (new Date().toLocaleDateString(undefined, options));
