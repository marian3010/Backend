import mongoose from "mongoose";

const orderProdSchema = new mongoose.Schema({
    idOrder: {
        type: String,
    },
    idProd: {
        type: String,
    }
});

const orderProdModel = mongoose.model("productosOrdenes", orderProdSchema);

export default orderProdModel;