import mongoose from "mongoose";

const orderProdSchema = new mongoose.Schema({
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
    },
    totalProd: {
        type: Number,
    }
});

const orderProdModel = mongoose.model("productosOrdenes", orderProdSchema);

export default orderProdModel;