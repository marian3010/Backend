"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_js_1 = require("./logger.js");
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
logger_js_1.consoleLogger.info('Running all benchmarks in parallel...');
run('http://localhost:8080/ecommerce/info');
