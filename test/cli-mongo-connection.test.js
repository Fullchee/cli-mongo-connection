"use strict";

require('mocha-generators').install();
const assert = require('assert');
const rewire = require('rewire'); // access private functions to test
const path = require('path');
const cliMongoConnection = rewire(path.resolve(__dirname, '..', 'cli-mongo-connection.js'));

describe('', function() {
    const  = cliMongoConnection.__get__('');

    it('', function() {
        
    });
});