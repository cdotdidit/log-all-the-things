const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
// write your logging code here
var userGetData = req.get("User-agent");
var newUserData = '"' + userGetData + '"';
dataArray.push(newUserData);

var DateTime = new Date();
var formatTime = DateTime.toISOString();
dataArray.push(formatTime);

var Method = req.method;
dataArray.push(Method);

var Resource = req.url;
dataArray.push(Resource);

var httpVer = req.httpVersion;
dataArray.push("HTTP/" + httpVer);

var status = res.statusCode;
dataArray.push(status);

let newArrayofStr = dataArray.join(',');
let breakLineOnArr = newArrayofStr + "\n";

console.log(newArrayofStr);

fs.appendFile("/tmp/log.csv", breakLineOnArr, (err) => {
    if (err) throw err;
    console.log('The data has been appended to the log CSV file!');
  });
function emptyTheArray(){
  dataArray.length = 0;
}
emptyTheArray();

next();

});

app.get('/', (req, res) => {
// write your code to respond "ok" here
res.status(200).send("ok");
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
const csvFilePath='/Users/admin/projects/node101-log-all-the-things/tmp/log.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
res.status(200).send(jsonObj);
})
});

module.exports = app;
