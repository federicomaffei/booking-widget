var Browser = require('zombie');
var expect = require('expect.js');
browser = new Browser();

describe('index page', function(){
    it('has a title', function(done) {
        browser.visit('http://localhost:3000/', function() {
            expect(browser.text('title')).to.equal('OpenTable API Reservation');
            done();
        });
    });
});