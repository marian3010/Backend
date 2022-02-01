import { dao } from "../server"
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'

export interface Producto {
    id?: number;
    code: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    timestamp?: number;
    cantidad?: number;
} 

class Productos {
    public constructor() {
    };
    
    public async agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number) {
        try {
            const producto: Producto = {
                code,
                title,
                description,
                price,
                thumbnail,
                stock
            }
            const response = await dao.agregarProducto(producto);
            consoleLogger.info(`función exitosa ${response}`)
            return producto;
        }
        catch (error) {
            errorLogger.error(error);
        }
    };

    public async buscarProducto(id:any): Promise<any> {
        let productoEncontrado
        try {
            productoEncontrado = await dao.buscarProducto(id)
            consoleLogger.info(`producto encontrado ${productoEncontrado}`);
        }
        catch (error) {
            errorLogger.error(error);
        }
        return productoEncontrado;
    };

    public async listarProductos(filtro: any, valorDesde: any, valorHasta:any): Promise<any> {
        let listaProductos: Producto[] = [];
        try {
            const rows = await dao.listarProductos()
            if (rows) {
                for (const row of rows) {
                    listaProductos.push({code:row["code"],title:row["title"],description:row["description"],price:row["price"],thumbnail:row["thumbnail"],stock:row["stock"],timestamp:row["timestamp"],id:row["id"]});
                };
            };
            consoleLogger.info(`lista productos ${listaProductos}`)
            consoleLogger.info(`filtro ${filtro}`);
            consoleLogger.info(`valor desde ${valorDesde}`);
            consoleLogger.info(`valor hasta ${valorHasta}`);
            if (!filtro) {
                consoleLogger.info("sin filtro")
                consoleLogger.info(`lista productos ${listaProductos}`)
                return listaProductos;
            }    
            if (filtro === 'nombre') 
                return [listaProductos.find(producto => producto.title === valorDesde)]
            if (filtro === 'codigo')
                return [listaProductos.find(producto => producto.code === valorDesde )]
            if (filtro === 'precio')
                return listaProductos.filter(producto => producto.price > valorDesde && producto.price < valorHasta)
            if (filtro === 'stock')
                return listaProductos.filter(producto => producto.stock > valorDesde && producto.stock < valorHasta)
          
        }
        catch (error) {
            errorLogger.error(error);
        }
        return listaProductos; 
    };            

    public async borrarProducto(id:any) {
        try {
            const response = await dao.borrarProducto(id)
            return response;
        } 
        catch (error) {
            errorLogger.error(error);
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
            const response = await dao.actualizarProducto(id,producto);
            return response;
        } 
        catch (error) {
            errorLogger.error(error);
        }
    };        
};

export default Productos;
