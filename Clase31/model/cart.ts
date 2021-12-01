import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
    },
});

const cartModel = mongoose.model("carritos", cartSchema);

export default cartModel;