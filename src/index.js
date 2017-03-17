'use strict';
var Alexa = require("alexa-sdk");

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

        const request = require('request-promise')  
        const options = {  
          method: 'GET',
          uri: 'http://www.chapin.edu/data/calendar/rsscache/calendar_282.rss'
        }
        
        request(options)  
          .then(function (response) {
            console.log('request ok');
            this.emit(response);
          })
          .catch(function (err) {
            // Something bad happened, handle the error
            console.log('request ERROR');
            console.log(err);
            this.emit(response);
            
          })
        
        console.log('SayHello function end');
        this.emit(':tell', "I don't see any lunch on the calendar today.");
    }
};
