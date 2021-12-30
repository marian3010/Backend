import mongoose from 'mongoose';
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'

import { Document } from 'mongoose';

export interface IUsuario extends Document {
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    address?:string,
    age?:number,
    phone?:string,
};    

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },    
    lastName: {
        type:String,
    },
    address: {
        type:String,
    },
    age: {
        type:Number,
    },
    phone: {
        type:String,
    },
});

export async function buscoDatosUser(username:string) {
    let user:any = "";
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce")
        consoleLogger.info("Base de datos Mongo conectada");
        consoleLogger.info(`usuario que va a buscar en mongo ${username}`);
        user = await Users.findOne({
            username,
        })
    }  catch(error) {
        errorLogger.error(error);
    } finally {
       mongoose.disconnect().then(() => {
        consoleLogger.info("Base de datos desconectada");
       });
       return user;
    };
};   

export const Users = mongoose.model("usuarios", userSchema);

