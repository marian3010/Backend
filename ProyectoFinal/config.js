"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, process.env.NODE_ENV + ".env"),
});
module.exports = {
    MODE_ENV: process.env.MODE_ENV || 'development',
    PORT: process.env.PORT,
    EXP_TIME: process.env.EXP_TIME,
    PERSISTENCIA: process.env.PERSISTENCIA,
    MODO_CLUSTER: process.env.MODO_CLUSTER,
    TWILIO_ID: process.env.TWILIO_ID,
    TWILIO_PASS: process.env.TWILIO_PASS,
    TWILIO_SMS: process.env.TWILIO_SMS,
    TWILIO_WAPP: process.env.TWILIO_WAPP,
    GMAIL_PASS: process.env.GMAIL_PASS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_CEL_SMS: process.env.ADMIN_CEL_SMS,
    ADMIN_CEL_WAPP: process.env.ADMIN_CEL_WAPP,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS
};
