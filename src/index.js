'use strict';
var Alexa = require("alexa-sdk");
var request = require("request");
var APP_ID = "amzn1.ask.skill.c958f220-e3fb-4d54-876a-f9bf0e7bf43c"


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
        var dateSlot = this.event.request.intent.slots.Date
        if (dateSlot && dateSlot.value) {
            var dateRequested = dateSlot.value;
            console.log('Date specified.');
        }
        else {
            var dateRequested=new Date();
            console.log('No date in slot.');
        }
        console.log('The date requested is', dateRequested.toString());
        
        var ical = require('ical');
        ical.fromURL('http://www.chapin.edu/data/calendar/rsscache/calendar_282.ics', {}, function(err, data) {
        for (var k in data){
            if (data.hasOwnProperty(k)) {
              var ev = data[k]
              console.log(ev.start.getDate().toString());
              if (dateRequested == ev.start.getDate())  {
                    console.log("Lunch is", ev.summary, 'on ', ev.start.getDate());
              }
                
            }            
          }
        }); //ical
       
    } //saylunch
}; //handlers
