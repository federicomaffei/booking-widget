var config = {};

config.apiPath = 'https://sandbox-api.opentable.co.uk/v1/restaurants/';
config.authToken = 'token ' + process.env.WIDGET_API_KEY;
config.messages = {
    invalidDate: 'reservation date cannot be in the past',
    emptyDate: 'reservation date cannot be empty',
    emptyTime: 'time slot cannot be empty',
    invalidPartySize: 'party size has to be an integer',
    genericValidationError: 'There have been validation errors',
    emptyFirstName: 'customer first name cannot be empty',
    emptyLastName: 'customer first name cannot be empty',
    invalidEmail: 'customer email not valid',
    emptyPhone: 'customer phone number cannot be empty'
};

module.exports = config;