const mongoose = require("mongoose");
const modelMensajes = require("../model/messages.js");

export interface Mensaje {
  author: string;
  fecha: number;
  text: string;
} 

export class Mensajes {
  constructor() {
  };

  public async leerMensajes() {
    let mensajesArray: Mensaje[] = []
    try {
      await mongoose.connect("mongodb://localhost:27017/ecommerce")
      console.log("Base de datos conectada");
      mensajesArray = await modelMensajes.default.find()
    }
    catch(error) {
         console.log(error);
    } finally {
        mongoose.disconnect().then(() => {
          console.log("Base de datos desconectada");
        });
        return mensajesArray;
    };
  };
      
  public async guardarMensajes(mensaje: Mensaje) {
    console.log("mensaje a insertar en db", mensaje);
    await mongoose.connect("mongodb://localhost:27017/ecommerce")
    console.log("Base de datos conectada");
    await modelMensajes.default.insertMany(mensaje, (error:string, docs:[]) => {
      if (error) {
        console.log(error)
        throw new Error(error);
      }
      console.log("docs",docs);
      mongoose.disconnect(() => {
        console.log("Base de datos desconectada");
      });
    });
  } 
};


