import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
    
});

module.exports = {
    MODE_ENV: process.env.MODE_ENV || 'development',
    PERSISTENCIA: process.env.PERSISTENCIA,
    MODO_CLUSTER: process.env.MODO_CLUSTER,
    TWILIO_ID: process.env.TWILIO_ID || 'AC330b46057cc4a08728f3f09fcec2a142',
    TWILIO_PASS: process.env.TWILIO_PASS || '7991916df081043792e0a8217766656d',
    GMAIL_PASS: process.env.GMAIL_PASS || 'andtleriqhfvcvhv',
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS
}