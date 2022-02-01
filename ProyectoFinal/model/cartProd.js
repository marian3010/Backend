"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cartProdSchema = new mongoose_1.default.Schema({
    idCart: {
        type: String,
    },
    idProd: {
        type: String,
    },
    cantProd: {
        type: Number,
    }
});
var cartProdModel = mongoose_1.default.model("productosCarritos", cartProdSchema);
exports.default = cartProdModel;
