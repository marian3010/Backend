
import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import fs from "fs";
import {productoDto} from "../dto/productoDto"
import {consoleLogger, errorLogger, warningLogger} from '../../logger.js'

const fileProductos = "./data/productos.txt";
const fileMensajes = "./data/mensajes.txt";
const fileCarrito = "./data/carritos.txt";
const fileOrdenes = "./data/ordenes.txt";

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}

interface Order {
    id: number;
    timestamp: number;
    status: string;
    emailBuyer: string;
    productos: [];
}

class FsDao implements Operaciones {
    public carrito: Cart
    public nuevoCartId: number
    public orden: Order
    private static instance: FsDao;    
        
    constructor() {
        if (typeof FsDao.instance === 'object') {
            consoleLogger.warn("ya existe el objeto")
            return FsDao.instance;
        }
        FsDao.instance = this;
        this.nuevoCartId = 1;
        this.carrito = {
            id: this.nuevoCartId,
            timestamp: Date.now(),
            productos: [],
        };
        this.orden = {
            id: 1,
            timestamp: Date.now(),
            status: "generada",
            emailBuyer: "",
            productos: []
        }
                
    }
    getNextId(productos:any) {
        const { length } = productos;
    
        return length ? productos[length - 1].id + 1 : 1;
    }  
    
    getTimestamp() {
        return new Date();
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        let productos = [];
        try {
            productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
        }
        catch (error) {
            errorLogger.error(error);
        } 
        const dto = productoDto(
            producto,
            this.getNextId(productos),
            this.getTimestamp()
          );
        
        consoleLogger.info (`prod a guardar ${JSON.stringify(dto)}`);
        productos.push(dto);
        await fs.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8");
        return response;
    };

    async buscarProducto(id:any) {
        let respuesta = []
        try {
            consoleLogger.info('buscar prod en fs')
            let productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < productos.length; i++) {
                if (productos[i].id == parseInt(id)) {
                    const prod: Producto = productos[i]
                    respuesta.push(prod)
                    return respuesta;
                };
            };
            consoleLogger.info("no encontro el producto")
            return false;
        }
        catch (error) {
            errorLogger.error(error);
            return false;
        }
    };

    async listarProductos() {
        let productos = [];
        try {
            consoleLogger.info("listar productos desde productos.txt")
            const prods = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
                consoleLogger.info(`productos encontrados ${prods}`);
                for (const row of prods) {
                    let producto = {
                        code: row.code,
                        title: row.title,
                        description: row.description,
                        price: row.price,
                        thumbnail: row.thumbnail,
                        stock: row.stock,
                        timestamp: row.timestamp,
                        id: row.id
                    }  
                    productos.push(producto);  
                }
        } 
        catch (error) {
            errorLogger.error(error);
        }
        return productos;
    };    
    
    async borrarProducto(id:any): Promise<boolean> {
        let response = true;
        try {
            let productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < productos.length; i++) {
                if (productos[i].id == id) {
                    productos.splice(i, 1);
                    await fs.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8");
                };
            };
        }
        catch (error){
            errorLogger.error(error);
            response = false;
        }
        return response;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let response = false;
        try {
            let productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < productos.length; i++) {
                if (productos[i].id == id) {
                    productos[i].code = producto.code;
                    productos[i].title = producto.title;
                    productos[i].description = producto.description;
                    productos[i].price = producto.price;
                    productos[i].thumbnail = producto.thumbnail;
                    productos[i].stock = producto.stock;
                    productos[i].timestamp = producto.timestamp;
                    await fs.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8");
                    response = true;
                };
            };
        }
        catch (error) {
            errorLogger.error(error);
            response = false;
        }
        return response;
    };

    async leerMensajes() {
        let mensajesArray: Mensaje[] = []
        try {
            consoleLogger.info("listar mensajes desde mensajes.txt")
            mensajesArray = JSON.parse(await fs.promises.readFile(fileMensajes, "utf-8"))
                return mensajesArray;
        } 
        catch (error) {
            errorLogger.error(error);
            return false;
        }
    };
    
    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        try {
            let mensajesArray = JSON.parse(await fs.promises.readFile(fileMensajes, "utf-8"))
            let nuevoId = 1;
            if (mensajesArray.length !== 0) {
                nuevoId = mensajesArray[mensajesArray.length - 1].id + 1;
            }
            let message = {
                author: mensaje.author,
                fecha: mensaje.fecha,
                text: mensaje.text
            };
            consoleLogger.info (`mensaje a guardar ${message}`);
            mensajesArray.push(message);
            try {
                await fs.promises.writeFile(fileMensajes, JSON.stringify(mensajesArray, null, "\t"), "utf-8");
            } catch (error) {
                errorLogger.error(error);
                response = false;
            };
        }
        catch (error) {
            errorLogger.error(error);
            response = false;
        } 
        return response;
    };

    async agregarProdsCarrito(id:any, cantidad:number): Promise<boolean> {
        let response = true;
        try {
            this.carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
            // recorro los productos del carrito para ver si el producto a agregar ya existe en el carrito
            if (this.carrito.productos.length > 0) {
                for (let i:number = 0; i < this.carrito.productos.length; i++) {
                    if (this.carrito.productos[i].id == id) {
                        consoleLogger.info("el producto ya existe en el carrito");
                        response = false;
                        return response;
                    }
                } 
            }
        } catch (error){
            errorLogger.error(error);
        }
        let productos = []; 
        try {
            productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
        } catch(error) {
            errorLogger.error(error);
        }
        for (let i:number = 0; i < productos.length; i++) {
            if (productos[i].id == id) {
                const prod: Producto = {
                    code: productos[i].code,
                    title: productos[i].title,
                    description: productos[i].description,
                    price: productos[i].price,
                    thumbnail: productos[i].thumbnail,
                    stock: productos[i].stock,
                    timestamp: productos[i].timestamp,
                    id: productos[i].id,
                    cantidad: cantidad,
                }
                this.carrito.productos.push(prod);
                await fs.promises.writeFile(fileCarrito, JSON.stringify(this.carrito, null, "\t"), "utf-8")
                consoleLogger.info(`producto agregado al carrito ${prod}`);
                return response;
            };
        };
        response = false;
        consoleLogger.warn("producto no encontrado");
        warningLogger.warn("producto no encontrado");
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        const carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
        const listaProductos = carrito.productos
        let producto = [];
        for (const prod of listaProductos) {
            if (prod.id === parseInt(id)) {
                producto.push(prod);
            }
        } 
        return(producto);
    }; 
    
    async listarProdsCarrito() {
        let carrito = [];
        try {
            consoleLogger.info("listar productos del carrito desde carrito.txt")
            carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
                return carrito.productos;
        } 
        catch (error) {
            errorLogger.error(error);
            return false;
        }
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = false;
        try {
            let carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
            for (let i:number = 0; i < carrito.productos.length; i++) {
                if (carrito.productos[i].id == parseInt(id)) {
                    carrito.productos.splice(i, 1);
                    await fs.promises.writeFile(fileCarrito, JSON.stringify(carrito, null, "\t"), "utf-8");
                    response = true;
                };
            };
        }
        catch (error){
            errorLogger.error(error);
        }
        return response;
    };

    async generarOrden(userMail:string, prodList:any): Promise<any> {
        let ordenes = [];
        try {
            ordenes = JSON.parse(await fs.promises.readFile(fileOrdenes, "utf-8"))
          
        } catch (error) {
            errorLogger.error(error);
        } 
        if (ordenes.length > 0) {
            this.orden.id = ordenes.length +1
        } else this.orden.id = 1;
        this.orden.emailBuyer = userMail;
        this.orden.productos = prodList;
        await fs.promises.writeFile(fileOrdenes,JSON.stringify(this.orden, null, "\t"), "utf-8")
        return this.orden.id;
    };  
};        
                 
export default FsDao;