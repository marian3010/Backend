"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        require: true,
    },
    fecha: {
        type: Number,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
});
var model = mongoose_1.default.model("mensajes", messageSchema);
exports.default = model;
