"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var orderProdSchema = new mongoose_1.default.Schema({
    idOrder: {
        type: String,
    },
    idProd: {
        type: String,
    },
    cantProd: {
        type: Number,
    },
    priceProd: {
        type: Number,
    }
});
var orderProdModel = mongoose_1.default.model("productosOrdenes", orderProdSchema);
exports.default = orderProdModel;
