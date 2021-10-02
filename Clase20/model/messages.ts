import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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

 const model = mongoose.model("mensajes", messageSchema);

 export default model;