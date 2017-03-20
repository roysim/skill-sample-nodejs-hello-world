'use strict';
var Alexa = require("alexa-sdk");
var request = require("request");
var APP_ID = "amzn1.ask.skill.c958f220-e3fb-4d54-876a-f9bf0e7bf43c"
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
        var speechOutput = "I am having trouble getting the lunch menu.";
        var thisObj = this;
        
        var dateSlot = this.event.request.intent.slots.Date
        if (dateSlot && dateSlot.value) {
            var dateRequested = getDateFromSlot(dateSlot.value);
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
//              console.log(ev.start.toString());
              if (dateRequested.getDate() == ev.start.getDate() && dateRequested.getMonth() == ev.start.getMonth())  {
                    speechOutput = "Lunch is " + ev.summary + ' on ' +  monthNames[dateRequested.getMonth()] + " " + dateRequested.getDate();
                    console.log(speechOutput);
                    

              }
                
            }            
          }
          thisObj.emit(":tell", speechOutput);
        }); //ical
       
    } //saylunch
}; //handlers

// Given an AMAZON.DATE slot value parse out to usable JavaScript Date object
// Utterances that map to the weekend for a specific week (such as �this weekend�) convert to a date indicating the week number and weekend: 2015-W49-WE.
// Utterances that map to a month, but not a specific day (such as �next month�, or �December�) convert to a date with just the year and month: 2015-12.
// Utterances that map to a year (such as �next year�) convert to a date containing just the year: 2016.
// Utterances that map to a decade convert to a date indicating the decade: 201X.
// Utterances that map to a season (such as �next winter�) convert to a date with the year and a season indicator: winter: WI, spring: SP, summer: SU, fall: FA)
function getDateFromSlot(rawDate) {
    // try to parse data
    var date = new Date(Date.parse(rawDate));
    return date;
    var result;
    // create an empty object to use later
    var eventDate = {

    };

    // if could not parse data must be one of the other formats
    if (isNaN(date)) {
        // to find out what type of date this is, we can split it and count how many parts we have see comments above.
        var res = rawDate.split("-");
        // if we have 2 bits that include a 'W' week number
        if (res.length === 2 && res[1].indexOf('W') > -1) {
            var dates = getWeekData(res);
            eventDate["startDate"] = new Date(dates.startDate);
            eventDate["endDate"] = new Date(dates.endDate);
            // if we have 3 bits, we could either have a valid date (which would have parsed already) or a weekend
        } else if (res.length === 3) {
            var dates = getWeekendData(res);
            eventDate["startDate"] = new Date(dates.startDate);
            eventDate["endDate"] = new Date(dates.endDate);
            // anything else would be out of range for this skill
        } else {
            eventDate["error"] = dateOutOfRange;
        }
        // original slot value was parsed correctly
    } else {
        eventDate["startDate"] = new Date(date).setUTCHours(0, 0, 0, 0);
        eventDate["endDate"] = new Date(date).setUTCHours(24, 0, 0, 0);
    }
    return eventDate;
}
