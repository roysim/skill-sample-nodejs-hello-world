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
        console.log('SayHello function start');
        request('http://www.chapin.edu/data/calendar/rsscache/calendar_282.rss', function (error, response, body) {
            console.log('request start');
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                this.emit(':tell', body);
            }
            else {
                console.log(error);
            }
        });
        console.log('SayHello function end');
        this.emit(':tell', "I don't see any lunch on the calendar today.");
    }
};
