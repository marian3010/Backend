import { dao } from "../server"
import { consoleLogger } from "../logger";

export interface Mensaje {
  id?: number;
  author: string;
  fecha: number;
  text: string;
}; 

export class Mensajes {
  constructor() {
  };

  public async leerMensajes() {
    let mensajesArray: Mensaje[] = []
    try {
      const rows = await dao.leerMensajes()
      if (rows) {
        for (const row of rows) {
            mensajesArray.push({author:row["author"],fecha:row["fecha"],text:row["text"]});
        }
      }
      return mensajesArray;
    }  catch (error){
        console.log(error);
    }  
  };
      
  public async guardarMensajes(mensaje: Mensaje) {
    try {
      const response = await dao.guardarMensajes(mensaje);
      console.log("función exitosa", response)
      return mensaje;
    }
    catch (error) {
      console.log(error);
    }
  } 
};


