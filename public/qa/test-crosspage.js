var Browser = require("zombie"), // CANNOT RUN THIS TEST BECAUSE ZOMBIE IS WEIRD!!
	assert = require('chai').assert;

var browser;

suite('Cross-Page tests', function() {
	setup(function() {
		browser = new Browser();
	});
	
	test('requesting a group rate quote from the hood-river tour page ' + 
		'should populate the referer field', function() {
		var referrer = 'http://localhost:3000/tours/hood-river';
		browser.visit(referrer, function() {
			browser.clickLink('.requestGroupRate', function() {
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});
	
	test('requesting a group rate quote from the oregon-coast tour page ' + 
		'should populate the referer field', function() {
		var referrer = 'http://localhost:3000/tours/oregon-coast';
		browser.visit(referrer, function() {
			browser.clickLink('.requestGroupRate', function() {
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});
	
	test('visiting the "request group rate" page directly' + 
		'should populate the referer field as empty referrer field', function() {
		browser.visit('http://localhost:3000/tours/request-group-rate', function() {
			browser.clickLink('.requestGroupRate', function() {
				assert(browser.field('referrer').value === '');
				done();
			});
		});
	});
});