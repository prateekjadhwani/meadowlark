var fortune = require("../../lib/fortune.js");
var expect = require("chai").assert;

suite('Fortune Cookie Test', function() {
	test('getFortune() should return a fortune', function() {
		expect(typeof fortune.getFortune() === 'string');
	});
});