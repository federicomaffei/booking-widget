describe('home page', function() {

    var request = require('supertest'),
        expect = require('expect.js'),
        app = require('../../app'),
        moment = require('moment');

    it('should return 200', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});