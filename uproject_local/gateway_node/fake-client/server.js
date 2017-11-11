var express = require("express");
var app = express();
var request = require('request');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://localhost:3000/postTest',
    method: 'POST',
    headers: headers,
    form: {'key1': 'xxx', 'key2': 'yyy'}
}
console.log("launch my fake client");
// Start the request
request(options, function (error, response, body) {
console.log("make my request");    
if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    } else {
console.log(response);
console.log(error);
console.log("else of request");
}})
