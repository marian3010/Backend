import mongoose from 'mongoose';

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

