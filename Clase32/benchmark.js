"use strict";
var autocannon = require('autocannon');
var stream = require('stream');
var run = function (url) {
    var buffer = [];
    var outputStream = new stream.PassThrough();
    var instance = autocannon({
        url: url,
        connections: 100,
        duration: 20,
    });
    autocannon.track(instance, {
        outputStream: outputStream,
    });
    outputStream.on('data', function (data) {
        buffer.push(data);
    });
    instance.on('done', function () { return process.stdout.write(Buffer.concat(buffer)); });
};
console.log('Running all benchmarks in parallel...');
run('http://localhost:8080/ecommerce/info');
