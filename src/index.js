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
        request('http://www.chapin.edu/data/calendar/rsscache/calendar_285.rss', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body); 
                //console.log(response.statusCode);
                
                var parseString = require('xml2js').parseString;
                var dataXML = body;
                parseString(dataXML, function (err, result) {
                    var dataJSON = result;
                    console.dir(dataJSON);
                    console.log(util.inspect(dataJSON, false, null));
                    console.log(
                    //this.emit(':tell', JSON.stringify(dataJSON));

                });
                                
            }
            else
            {
                console.log('Error with request');
                this.emit('Oops.');
            }
            
        });
    }
};
