//Here are the specific user stories you should implement for this project:

// User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).

// User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.

// User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.
//new RegExp(/ab+c/, 'i');
var dateMatch= /(0?[1-9]|[12][0-9]|3[01])[\s\.\\\/\|](\w+)[\s\.\\\/\|](\d+)/ig;
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
    console.log("Hello! It is "+moment().format("MMMM DD, Y. HH:mm")+".");
    return;
}
//check(process.argv[2]);

if (dateMatch.test(input)) {
    checkUserDate(input);
} else {check(input);}

//if input matches regex string, go to regex function. else, execute check() function.

function checkuserDate(string) {
    var array = dateMatch.exec(string);
    console.log(arr);
}

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