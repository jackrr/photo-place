/*
 * A simple "hello world" server
 * This will be transformed into the first lightweight PhotoPlace server
 */

var express = require('express');
var app = express();

app.get('/', function(req, res){
    console.log('Received GET request');
    res.send('Hello, beautiful world!');
});

app.listen(3000);
console.log('Listening on port 3000');

