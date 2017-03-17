'use strict';
var Alexa = require("alexa-sdk");
var request = require('request');


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        request('http://www.chapin.edu/data/calendar/rsscache/calendar_282.rss', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred 
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
          console.log('body:', body); // Print the HTML for the Google homepage. 
        });
        this.emit(':tell', 'Todays lunch is pizza.');
    }
};
