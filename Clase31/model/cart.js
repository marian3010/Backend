"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cartSchema = new mongoose_1.default.Schema({
    timestamp: {
        type: Number,
    },
});
var cartModel = mongoose_1.default.model("carritos", cartSchema);
exports.default = cartModel;
