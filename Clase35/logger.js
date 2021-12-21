"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warningLogger = exports.errorLogger = exports.consoleLogger = void 0;
var pino = require('pino');
exports.consoleLogger = pino({
    level: 'info',
});
exports.errorLogger = pino(pino.destination({
    dest: 'error.log',
}));
exports.warningLogger = pino(pino.destination({
    dest: 'warn.log',
}));
