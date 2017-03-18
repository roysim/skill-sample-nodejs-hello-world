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
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'SayHello': function () {
        request('http://www.chapin.edu/data/calendar/rsscache/calendar_282.rss', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body); 
                //console.log(response.statusCode);
                var parser = require('xml2json');
                var dataXML = body;
                var dataJSON = parser.toJson(dataXML);
                console.log(dataJSON);
                this.emit(':tell', dataJSON);
            }
            else
            {
                console.log('Error with request');
                this.emit('Oops.');
            }
            
        });
    }
};
