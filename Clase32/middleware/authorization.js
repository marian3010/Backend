"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
var server_js_1 = __importDefault(require("../server.js"));
var authorizationMiddleware = function () { return function (req, _res, next) { if (!server_js_1.default) {
    return next(_res.status(403).json('No autorizado'));
} next(); }; };
exports.authorizationMiddleware = authorizationMiddleware;
