describe('home page', function() {

    require('expect.js');
    require('moment');
    var request = require('supertest'),
        app = require('../../app');


    it('should return 200', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});