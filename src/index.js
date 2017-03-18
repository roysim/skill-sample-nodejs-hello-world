'use strict';
var Alexa = require("alexa-sdk");
var request = require("request");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
//http://www.chapin.edu/data/calendar/rsscache/calendar_282.rss
var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'SayHello': function () {
        
        var ical = require('ical');
        ical.fromURL('http://www.chapin.edu/data/calendar/rsscache/calendar_285.ics', {}, function(err, data) {
          for (var k in data){
            if (data.hasOwnProperty(k)) {
              var ev = data[k]
              console.log("Event: ", ev.summary, 'on ', ev.start.getDate());
            }
          }
        }); //ical
       
    } //sayhello
}; //handlers
