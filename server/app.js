const express = require('express');// this is the actual express server
const app =  express();//you have to call the express server
const fs = require('fs'); //controls separately stored files as part of a multiuser system
const path = require('path'); //provides utilities for working with file and directory paths
const morgan = require('morgan')//this is a logger so it logs all the data
const moment = require('moment'); //date library for parsing, validating, manipulating, and formatting dates

let object =[];

    app.use((req, _res, next) => {//sends out a request to get the parsed data

        let Agent = req.headers['user-agent'];
        let Time = moment().format();
        let Method = req.method
        let Resource = req._parsedUrl['path']; //path is inside of the brackets because it is the information already being parsed
        let Version = `HTTP/${req.httpVersion}`; //template literal
        let Status = "200";
            console.log(Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status);
    
    
    var userInfo = "/n" + Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status; //this put the information on my DOM into human readable data in order to see what is happening

var userInfo = //this is parsing the data from above^^
{
    'Agent' : req.headers['user-agent'],
    'Time' : moment().format(),
    'Method' : req.method,
    'Resource' : req._parsedUrl['path'],//path is inside of the brackets because it is the information already being parsed
    'Version' : `HTTP/${req.httpVersion}`, //template literal
    'Status' : "200",
};

object.push(userInfo); //after it got the data from above, it pushed the parsed data into the array
fs.appendFile(path.resolve(__dirname, 'log.csv'),userInfo, function(err){
    if (err) throw err; // this is the callback function
});
next();
    });





app.get('/', (req, res) => { //this tells it to go out and get the data from the route
// write your code to respond "ok" here
res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('ok');
});

app.get('/logs', (req, res ) => {// this says to go to the log route and get the jSON data and respond with it 
// write your code to return a json object containing the log data here
res.json(object);//JSON stands for Javascript Object Notation (it is a key value pair always)(key:value)
// }
});

module.exports = app;