describe('posting to provisioning reservation', function(){

    var request = require('supertest'),
        expect = require('expect.js'),
        app = require('../../app'),
        moment = require('moment');

    it('should return 200 with correct request', function(done){
        request(app)
            .post('/provision_reservation/1')
            .send({
                dateTime: '2014-11-28T09:30',
                partySize: 1
            })
            .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
            .expect(200, done);
    });
});