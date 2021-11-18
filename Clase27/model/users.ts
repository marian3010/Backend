import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUsuario extends Document {
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string
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
});

export const Users = mongoose.model("usuarios", userSchema);

