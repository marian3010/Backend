import mongoose from "mongoose";

const cartProdSchema = new mongoose.Schema({
    idCart: {
        type: String,
    },
    idProd: {
        type: String,
    }
});

const cartProdModel = mongoose.model("productosCarritos", cartProdSchema);

export default cartProdModel;