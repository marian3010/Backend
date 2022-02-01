import mongoose from 'mongoose';
const config = require ("../config");
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
    let usuario:any = "";
    try {
        const dbname = config.MONGO_DBNAME
        const password = config.MONGO_PASS
        const user = config.MONGO_USER
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
        consoleLogger.info("Base de datos conectada");
        consoleLogger.info(`usuario que va a buscar en mongo ${username}`);
        usuario = await Users.findOne({
            username,
        })
    }  catch(error) {
        errorLogger.error(error);
    } finally {
       mongoose.disconnect().then(() => {
        consoleLogger.info("Base de datos desconectada");
       });
       return usuario;
    };
};   

export const Users = mongoose.model("usuarios", userSchema);

