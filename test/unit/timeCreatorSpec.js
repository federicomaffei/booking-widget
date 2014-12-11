describe('time creator', function(){
    var creator = require('../../assets/js/timeCreator'),
        expect = require('expect.js'),
        moment = require('moment');

    describe('given the date of today', function(){
        it('should start from a minTime which depends on the current time if same day', function(){
            expect(creator._test.setStart(moment())).to.equal(parseInt(moment().format('H')));
        });
    });

    describe('AM/PM conversion', function(){
        it('should be able to convert a time string in AM format', function(){
            expect(creator._test.convertTime('T07:00')).to.equal('07:00 AM');
        });

        it('should be able to convert a time string in PM format', function(){
            expect(creator._test.convertTime('T23:00')).to.equal('11:00 PM');
        });
    });

    describe('given a date, a maximum and minimum time', function(){
        var minTime = 7,
            maxTime = 22;

        it('should be able return an array of times formatted as Thh:mm', function(){
            expect(creator._test.createSlots(minTime, maxTime)).to.eql([
                'T07:00', 'T07:30', 'T08:00', 'T08:30', 'T09:00', 'T09:30', 'T10:00', 'T10:30', 'T11:00', 'T11:30', 'T12:00', 'T12:30',
                'T13:00', 'T13:30', 'T14:00', 'T14:30', 'T15:00', 'T15:30', 'T16:00', 'T16:30', 'T17:00', 'T17:30', 'T18:00', 'T18:30',
                'T19:00', 'T19:30', 'T20:00', 'T20:30', 'T21:00', 'T21:30', 'T22:00'
            ]);
        });
    });

});