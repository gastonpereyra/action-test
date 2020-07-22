'use strict';

const eyesTypes = {
    s: '..',
    m: 'oo',
    l: 'OO',
    rip: 'xx',
    sleep: '--',
    crazy: 'oO',
    happy: '^^',
    disapprove: 'ಠ.ಠ',
    rolling: '◔.◔',
    frustated: '⋋_⋌'
}

module.exports = (args) => {

    const [,,text = 'moooooo!!!', eyes = 'm', tongue = ''] = args;

    if(typeof text !== 'string')
        throw new Error('Text must be String');

    if(typeof eyes !== 'string')
        throw new Error('Eyes must be String');

    if(!Object.keys(eyesTypes).includes(eyes))
        throw new Error('Invalid Eyes type');

    if(typeof tongue !== 'string')
        throw new Error('Text must be String');

    return {
        text,
        eyes: eyesTypes[eyes],
        tongue
    };
}