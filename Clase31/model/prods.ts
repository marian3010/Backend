import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    stock: {
        type: Number,
    },
    timestamp: {
        type: Number,
    },
});

const prodModel = mongoose.model("productos", prodSchema);

export default prodModel;