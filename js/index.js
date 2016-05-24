//Here are the specific user stories you should implement for this project:

// User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).

// User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.

// User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.
//new RegExp(/ab+c/, 'i');
var dateMatch= /(0?[1-9]|[12][0-9]|3[01])[\s\.\\\/\|](\D+)[\s\.\\\/\|](\d+)/;
//can use this regex to match somebody's date that they input, split it up, and use that to convert into a date.
var fs = require('fs');
var moment = require('moment');
var output = {
    "unix": null,
    "natural": null,
    "speech": null
};

var input = process.argv[2];
if (input=="now" || input=="what time is it") {
    console.log("Hello! It is "+moment().format("MMMM DD, Y HH:mm")+".");
    return;
}
//check(process.argv[2]);

if (dateMatch.test(input)) {
    checkUserDate(input);
} else {
    check(input);
}

//if input matches regex string, go to regex function. else, execute check() function.

function checkUserDate(string) {
    var arr = dateMatch.exec(string);
    console.log(arr);
    var monthName = new Date(arr[2] + " 1, 1970");
    var monthDigit = monthName.getMonth()+1;
    var newDate=arr[1]+'/'+monthDigit+'/'+arr[3];
    console.log(newDate);
    check(newDate);
}
//cool, so we can loop through to concatenate a string now, right? 31 in first, then figure out what month it corresponds to (switch statement) and then push that up to the 31, then push the year up against it. 

function check(string) {
    if (isNaN(string) === true) {
        output.natural = string;
        unixConverter(string);
        console.log(output);
        return output;
    } else {
        output.unix = string;
        naturalConverter(string);
        speechConverter(string);
        console.log(output);
        return output;
    }
}

function unixConverter(string) {
    output.unix = moment(string, "DD/MM/YYYY").unix();
    speechConverter(output.unix);
}

function naturalConverter(string) {
    output.natural = moment.unix(string).format("DD/MM/YYYY");
}

function speechConverter(string) {
    output.speech = moment.unix(string).format("MMMM DD, Y");
    if (output.speech=="Invalid date") {
        output.unix =null;
        output.natural =null;
        output.speech = null;
        return;
    }
}