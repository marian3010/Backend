const mongoose = require("mongoose");
const model = require("../model/messages.js");

export interface Mensaje {
  author: string;
  fecha: number;
  text: string;
} 

export class Mensajes {
  constructor() {
  };

  public leerMensajes() {
    const mensajesArray: Mensajes[] = []
    mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
      console.log("Base de datos conectada");
      model.mensajes
     .find()
     .sort({ fecha: 1 })
     .then((response:[]) => {
        console.log("mensajes leidos",response);
      //for (const row of response) {
      //  mensajesArray.push({author:row["author"],fecha:row["fecha"],text:row["text"]});
        
      //}
        return mensajesArray;
      }) 
    .catch((error:string) => {
      console.log(error);
    })
    .finally(() => {
      mongoose.disconnect().then(() => {
        console.log("Base de datos desconectada");
      });
    });
  });
}; 
  
public guardarMensajes(mensaje: Mensaje) {
    mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.mensajes.insertMany(mensaje, (error:string, docs:[]) => {
        if (error) {
          throw new Error();
        }
        console.log(docs);
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      });
    });
  };
};


