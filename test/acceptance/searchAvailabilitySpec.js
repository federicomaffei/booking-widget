describe('posting to search availability', function(){

    var request = require('supertest'),
        expect = require('expect.js'),
        app = require('../../app'),
        moment = require('moment');

    it('should return 200 with correct request', function(done){
        request(app)
            .post('/1/search_availability')
            .send({
                timeSelect: 'T07:00',
                partySize: '1',
                date: moment().format('YYYY-MM-DD')
            })
            .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
            .expect(200, done);
    });
    it('should return 400 with date before today', function(done){
        request(app)
            .post('/1/search_availability')
            .send({
                timeSelect: 'T07:00',
                partySize: '1',
                date: moment().subtract(1, 'days').format('YYYY-MM-DD')
            })
            .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
            .expect(400, done);
    });
    it('should return 400 with empty time slot', function(done){
        request(app)
            .post('/1/search_availability')
            .send({
                timeSelect: '',
                partySize: '1',
                date: moment().format('YYYY-MM-DD')
            })
            .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
            .expect(400, done);
    });
    it('should return 400 with party size that is not integer', function(done){
        request(app)
            .post('/1/search_availability')
            .send({
                timeSelect: 'T07:00',
                partySize: 'test',
                date: '2014-12-09'
            })
            .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
            .expect(400, done);
    });
});