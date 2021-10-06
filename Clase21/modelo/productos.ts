import DaoFactory from '../src/DaoFactory';
import MariaDBDao from '../src/daos/MariaDBDao';
import MongoDBDao from '../src/daos/MongoDBDao';
import Sqlite3Dao from '../src/daos/Sqlite3Dao';
import { opcionCapa } from "../server"

console.log("opcion capa en productos", opcionCapa);
const daoFact = new DaoFactory();
const dao: MongoDBDao | Sqlite3Dao | MariaDBDao = daoFact.elegirBD(4)
console.log("Dao", dao);

export interface Producto {
    id?: number;
    code: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    timestamp: number;
} 

interface AProductos {
    productos: Producto[];
}

class Productos {
    public constructor() {
        
    };
    
    public async agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, timestamp:number = Date.now()) {
        try {
            const producto: Producto = {
                code,
                title,
                description,
                price,
                thumbnail,
                stock,
                timestamp 
            }
            const response = await dao.agregarProducto(producto);
            console.log("función exitosa", response)
            return producto;
        }
        catch (error) {
            console.log(error);
        }
    };

    public async buscarProducto(id:any): Promise<any> {
        try {
            const productoEncontrado = await dao.buscarProducto(id)
            return productoEncontrado;
        }
        catch (error) {
            console.log(error);
        }
    };

    public async listarProductos(): Promise<any> {
        try {
            let listaProductos: Producto[] = [];
            const rows = await dao.listarProductos()
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

    public async borrarProducto(id:any) {
        try {
            const response = await dao.borrarProducto(id)
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    };

    public async actualizarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, id:any) {
        try {
            const producto: Producto = {
                code,
                title,
                description,
                price,
                thumbnail,
                stock,
                timestamp: Date.now()
            }
            //const response = await dao.actualizarProducto(code, title, description, price, thumbnail, stock, id)
            const response = await dao.actualizarProducto(id,producto);
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    };        
};

export default Productos;
