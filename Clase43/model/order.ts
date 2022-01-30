import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
    },
    orderNumber: {
        type: Number,
    },
    status: {
        type: String,
    },
    emailBuyer: {
        type: String,
    }
});

const orderModel = mongoose.model("ordenes", orderSchema);

export default orderModel;