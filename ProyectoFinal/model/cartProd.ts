import mongoose from "mongoose";

const cartProdSchema = new mongoose.Schema({
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

const cartProdModel = mongoose.model("productosCarritos", cartProdSchema);

export default cartProdModel;