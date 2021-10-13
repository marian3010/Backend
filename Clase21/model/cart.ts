import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
    },
});

const cartModel = mongoose.model("productos", cartSchema);

export default cartModel;