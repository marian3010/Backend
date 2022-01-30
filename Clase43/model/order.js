"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.default.Schema({
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
var orderModel = mongoose_1.default.model("ordenes", orderSchema);
exports.default = orderModel;
