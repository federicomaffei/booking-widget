describe('server', function() {

    var request = require('supertest'),
        expect = require('expect.js'),
        app = require('../../app');

    describe('getting /', function() {
        it('should return 200', function(done) {
            request(app)
                .get('/')
                .expect(200, done);
        });
    });

    describe('posting to search availability', function(){
        it('should return 200 with correct request', function(done){
            request(app)
                .post('/1/search_availability')
                .send({
                    timeSelect:'T07:00',
                    partySize:'1',
                    date:'2014-12-25'
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        });
        it('should return 400 with empty date', function(done){
            request(app)
                .post('/1/search_availability')
                .send({
                    timeSelect:'T07:00',
                    partySize:'1',
                    date:''
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(400, done);
        });
    });

    describe('posting to provisioning reservation', function(){
        it('should return 200 with correct request', function(done){
            request(app)
                .post('/1/provision_reservation')
                .send({
                    dateTime: '2014-11-28T09:30',
                    partySize: 1
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        });
    });

    describe('posting to confirm reservation', function(){
        it('should return 200 with correct request', function(done){
            request(app)
                .post('/1/confirm_reservation')
                .send({
                    firstName: "Adam",
                    lastName: "West",
                    emailAddress: "adam.west@example.com",
                    phoneNumber: "07981234567"
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        });

    });
});