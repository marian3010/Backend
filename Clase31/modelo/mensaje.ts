import DaoFactory from "../src/DaoFactory";
import MariaDBDao from '../src/daos/MariaDBDao';
import MongoDBDao from '../src/daos/MongoDBDao';
import Sqlite3Dao from '../src/daos/Sqlite3Dao';
import FsDao from '../src/daos/FsDao';
import MemoryDao from '../src/daos/MemoryDao';
import { opcionCapa } from "../server"

const daoFact = new DaoFactory(opcionCapa);
const dao: MongoDBDao | Sqlite3Dao | MariaDBDao | FsDao | MemoryDao = daoFact.elegirBD()
console.log("Dao", dao);

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


