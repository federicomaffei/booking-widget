describe('posting to provisioning reservation', function(){

    require('expect.js');
    require('moment');
    var request = require('supertest'),
        app = require('../../app');

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