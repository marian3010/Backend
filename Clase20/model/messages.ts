import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  author: {
    type: String,
    require: true,
    max: 100,
  },
  fecha: {
    type: Number,
    require: true,
    max: 100,
  },
  texto: {
    type: String,
    require: true,
    max: 300,
  },
});

export const model = mongoose.model("mensajes", messageSchema);