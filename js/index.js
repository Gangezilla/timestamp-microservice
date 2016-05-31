var express = require('express');
var moment = require('moment');
var dateMatch = /(0?[1-9]|[12][0-9]|3[01])[\s\.\\\/\|](\D+)[\s\.\\\/\|](\d+)/;
var output = {
    "unix": null,
    "natural": null,
    "speech": null
};
var input = '';

var app = express();
app.listen(3000, function() {
});

app.use(express.static(__dirname + '/public'));

//es.sendfile(dir + '/' + file, {'root': '../'});
app.get('/', function(req, res) {
    //in here, pop in some HTML about someone needing to put in some stuff
    res.sendFile('index.html', {'root': '../'});
    res.sendFile('css/style.css', {'root': '../'});
});

app.get('/:timestamp', function(req, res) {
    input = req.params.timestamp;
    doWork(input);
    res.send(output);
});

function doWork(time) {
    if (dateMatch.test(input)) {
        checkUserDate(input);
    } else {
        check(input);
    }

    function checkUserDate(string) {
        string.replace(/%20/g, ' ');
        var arr = dateMatch.exec(string);
        var monthName = new Date(arr[2] + " 1, 1970");
        var monthDigit = monthName.getMonth() + 1;
        var newDate = arr[1] + '/' + monthDigit + '/' + arr[3];
        check(newDate);
    }

    function check(string) {
        if (isNaN(string) === true) {
            output.natural = string;
            unixConverter(string);
            // res.send(output);
        } else {
            output.unix = string;
            naturalConverter(string);
            speechConverter(string);
            // res.send(output);
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
        if (output.speech == "Invalid date") {
            output.unix = null;
            output.natural = null;
            output.speech = null;
        }
    }
}
