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
                .post('/search_availability')
                .send({
                    timeselect:'T07:00',
                    partysize:'1',
                    date:'2014-11-27'
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        });
        it('should return 400 with bad request', function(done){
            request(app)
                .post('/search_availability')
                .send({
                    timeselect:'wrong',
                    partysize:'1',
                    date:'2014-11-27'
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        })
    });
});