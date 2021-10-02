const mongoose = require("mongoose");
const model = require("../model/messages.js");
console.log ("Modelo", model);

export interface Mensaje {
  author: string;
  fecha: number;
  text: string;
} 

export class Mensajes {
  constructor() {
  };

  public leerMensajes() {
    let mensajesArray: Mensaje[] | undefined = []
    try {
      mongoose.connect("mongodb://localhost:27017/ecommerce", async()=> {
        console.log("Base de datos conectada");
        console.log("model.mensajes", model.mensajes);
        
          const docs:Mensaje[] = await model.mensajes
          .find()
          .sort({ fecha: 1 })
           console.log("mensajes leidos",docs);
           mensajesArray = docs
           return mensajesArray
      }) 
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
      
  public guardarMensajes(mensaje: Mensaje) {
    console.log("mensaje a insertar en db", mensaje);
    mongoose.connect("mongodb://localhost:27017/ecommerce"),() => {
      console.log("Base de datos conectada");
      model.mensajes.insertMany(mensaje, (error:string, docs:[]) => {
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
};

