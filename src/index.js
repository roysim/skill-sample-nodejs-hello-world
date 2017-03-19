'use strict';
var Alexa = require("alexa-sdk");
var request = require("request");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayLunch');
    },
    'unhandled': function () {
        this.emit('SayLunch');
    },
    'LunchIntent': function () {
        this.emit('SayLunch');
    },
    'SayLunch': function () {
        var dateSlot = this.event.request.intent.slots.Item
        if (dateSlot && dateSlot.value) {
            var dateRequested = dateSlot.value;
        }
        else var dateRequested=new Date();
        console.log('The date requested is', dateRequested.toString());
        
        var ical = require('ical');
        ical.fromURL('http://www.chapin.edu/data/calendar/rsscache/calendar_282.ics', {}, function(err, data) {
          for (var k in data){
            if (data.hasOwnProperty(k)) {
              var ev = data[k]
              console.log("Lunch is", ev.summary, 'on ', ev.start.getDate());
              
            }            
          }
        }); //ical
       
    } //saylunch
}; //handlers
