var fs = require('fs');
function readTotalLines(filePath, callback) {
    var fileBuffer = fs.readFileSync(filePath);
    var to_string = fileBuffer.toString();
    var split_lines = to_string.split("\n");
    callback(split_lines.length);
}
readTotalLines('../resources/contacts.txt', function (totalLine1) {
    readTotalLines('../resources/contacts2.txt', function (totalLine2) {
        readTotalLines('../resources/contacts3.txt', function (totalLine3) {
            console.log("total line of contacts.txt  = " + totalLine1);
            console.log("total line of contacts2.txt = " + totalLine2);
            console.log("total line of contacts3.txt = " + totalLine3);
            console.log("total line of all contact   = " + (totalLine1 + totalLine2 + totalLine3));
        })
    })
})