import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
    },
    status: {
        type: String,
    },
    emailBuyer: {
        type: String,
    },
    orderNum: {
        type: Number,
    }
});

const orderModel = mongoose.model("ordenes", orderSchema);

export default orderModel;