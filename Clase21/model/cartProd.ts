import mongoose from "mongoose";

const cartProdSchema = new mongoose.Schema({
    idCart: {
        type: String,
    },
    idProd: {
        type: String,
    }
});

const cartProdModel = mongoose.model("productos", cartProdSchema);

export default cartProdModel;