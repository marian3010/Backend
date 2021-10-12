import {Producto} from "./productos.js";
import DaoFactory from '../src/DaoFactory';
import MariaDBDao from '../src/daos/MariaDBDao';
import MongoDBDao from '../src/daos/MongoDBDao';
import Sqlite3Dao from '../src/daos/Sqlite3Dao';
import FsDao from '../src/daos/FsDao';
import MemoryDao from '../src/daos/MemoryDao';
import { opcionCapa } from "../server"

const daoFact = new DaoFactory(opcionCapa);
const dao: MongoDBDao | Sqlite3Dao | MariaDBDao | FsDao | MemoryDao = daoFact.elegirBD()
console.log("Dao", dao);

class Carrito {
  private static contador: number = 1;  
  public productos: Array<Producto>;
  private id: number;
  private timestamp: number;
       
    public constructor(){
        this.productos = [];
        this.id = Carrito.contador;
        this.timestamp = Date.now();
        Carrito.contador ++;
    };

    public async agregarProdsCarrito(id: any) {
      try {
          const response = await dao.agregarProdsCarrito(id);
          console.log("función exitosa", response)
          return response;
      }
      catch (error) {
          console.log(error);
      }
    };

    public async buscarProdCarrito(id:any): Promise<any> {
      try {
          const productoEncontrado = await dao.buscarProdCarrito(id)
          return productoEncontrado;
      }
      catch (error) {
          console.log(error);
      }
    };

    public async listarProdsCarrito(): Promise<any> {
        try {
            let listaProductos: Producto[] = [];
            const rows = await dao.listarProdsCarrito()
            if (rows) {
                for (const row of rows) {
                  listaProductos.push({code:row["code"],title:row["title"],description:row["description"],price:row["price"],thumbnail:row["thumbnail"],stock:row["stock"],timestamp:row["timestamp"],id:row["id"]});
                }
            }
            return listaProductos;
        }
        catch (error) {
            console.log(error);
        }
    };            

    public async borrarProdsCarrito(id:any) {
      try {
          const response = await dao.borrarProdsCarrito(id)
          return response;
      } 
      catch (error) {
          console.log(error);
      }
    };
      
     

};

export default Carrito;

