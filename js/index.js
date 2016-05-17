//Here are the specific user stories you should implement for this project:

// User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).

// User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.

// User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.
//it's not that hard, hey. create a function that checks whether a string is a date.
//create another function that converts a date into two different forms and then outputs it as a JSON.
//do a node thing that takes a request (as a string), and responds in the above form.
//make the argument it takes on board the bit following the domain on the webpage.

//set up npm in here, require some things...
var fs = require('fs');
var moment = require('moment');

var type = 0;
var unixOut = null;
var naturalOut = null;
var output = {
    "unix": unixOut,
    "natural": naturalOut
};

var input = process.argv[2];
check(input);




function check(string) {
    //first check if it's valid. then check if it's a date, or a unix. if it's date, assign dateOut, and convert to Unix. If it's unix, assign unixOut and convert to Date.
    if (moment(input).isValid() == false) {
        return output;
    } else {
            //check if it's a date, or unix timestamp.
        var day = moment.unix(string).format("DD MMMM, Y");
        var unix = moment(string).unix();
        console.log(unix);
        console.log(day);
    }
}

//this function checks whether someone has given us a date or not. If it's a number, that's easy. If it's a string, you'll need to check whether it's a time, like, December 20 2015 would get converted into December%2020%202015. Whereas December 35 2015 is not a correct thing.
function stringChecker(string) {
    if (isNaN(string) === true) {
        type = 0;
        stringConverter(input);
        //this means it is a date.
    } else {
        type = 1;
        dayCounter(string);
        //this means it is unix.
    }

    //well, unix time is the number of seconds that have elapsed since Coordinated Universal Time, which is Thursday 1 January 1970. Well, the easy one is probably Unix time, considering it's just a number. Take what someone has given us, say, 6739202212
    //its a correct unix time if it can be converted into a number, right?
}

function dayCounter(string) {
    //need to figure out how many seconds are counted in a number.
    var seconds = parseInt(string);
    //how many days in the number passed?
    var days = seconds / 86400;
    //with days, you can then start counting upwards from Jan 1 1970. How do we count days up? Does the Date object have the capacity to do that? Or moment? Can probably use date() somehow. We can use date() because IT uses Jan 1 1970. Hmm.
    //OMG, can just use Date.parse() to figure out if a string is a date or not...


}
