"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
var server_js_1 = require("../server.js");
var authorizationMiddleware = function () { return function (req, _res, next) { if (!server_js_1.isAdmin) {
    return next(_res.status(403).json('No autorizado'));
} next(); }; };
exports.authorizationMiddleware = authorizationMiddleware;
