/*
 * A simple "hello world" server
 * This will be transformed into the first lightweight PhotoPlace server
 */

var express = require('express');
var app = express();

// So, on get?
// app.get('/hello.txt', function(req, res){
//     var body = 'Hello world';
//     res.setHeader('Content-Type','text/plain');
//     res.setHeader('Content-Length', body.length);
//     res.end(body);
// });

app.get('/', function(req, res){
    console.log('Received GET request');
    res.send('Hello, beautiful world!');
});

app.listen(3000);
console.log('Listening on port 3000');

