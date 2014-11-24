describe('server', function() {

    var request = require('supertest'),
        app = require('../app');

    describe('getting /', function() {
        it('should return 200', function(done) {
            request(app)
                .get('/')
                .expect(200, done);
        });
    });

    describe('posting to search availability', function(){
        it('should return 200', function(done){
            request(app)
                .post('/search_availability')
                .send({
                    timeselect:'T07:00',
                    partysize:'1',
                    date:'2014-11-27'
                })
                .set('Authorization', 'token ' + process.env.WIDGET_API_KEY)
                .expect(200, done);
        })
    });
});