"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1.default.Schema({
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
var prodModel = mongoose_1.default.model("productos", messageSchema);
exports.default = prodModel;
