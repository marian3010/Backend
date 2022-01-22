import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import {productoDto} from "../dto/productoDto"
import {consoleLogger, errorLogger, warningLogger} from '../../logger.js'

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}
    
class MemoryDao implements Operaciones {
    private static instance: MemoryDao;
    public carrito: Cart
    public nuevoCartId: number
    public messages: Mensaje[]
    public messageNuevoId: number;
    public nuevoProdId:number
    public productos: Producto []
    
    constructor() {
        if (typeof MemoryDao.instance === 'object' ) {
            consoleLogger.warn("ya existe el objeto");
            return MemoryDao.instance;
        }
        MemoryDao.instance = this;
        this.nuevoCartId = 1;
        this.carrito = {
            id: this.nuevoCartId,
            timestamp: Date.now(),
            productos: [],
        };
        this.nuevoProdId = 0;
        this.productos = [];
        this.messages= [];
        this.messageNuevoId = 0;
    } 

    getTimestamp() {
        return new Date();
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        const dto = productoDto(
            producto,
            this.nuevoProdId ++,
            this.getTimestamp()
        );
        this.productos.push(dto);
        return response;
    };

    async buscarProducto(id:any) {
        let productos = [];
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                consoleLogger.info(`producto encontrado ${this.productos[i]}`);
                productos.push(this.productos[i])
                return productos;
            };
        };
        return false;
    };

    async listarProductos() {
        consoleLogger.info(`lista de productos en memoria ${this.productos}`);
        return this.productos;
    };

    async borrarProducto(id:any): Promise<boolean> {
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                consoleLogger.info(`producto borrado ${this.productos[i]}`);
                this.productos.splice(i, 1);
                return true;
            };
        };
        return false;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let response = false;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].code = producto.code;
                this.productos[i].title = producto.title;
                this.productos[i].description = producto.description;
                this.productos[i].price = producto.price;
                this.productos[i].thumbnail = producto.thumbnail;
                this.productos[i].stock = producto.stock;
                this.productos[i].timestamp = producto.timestamp;
                const prodActualizado = this.productos[i];
                response = true;
            };
        };
        return response;
    };

    async leerMensajes() {
        consoleLogger.info(`lista de mensajes en memoria ${this.messages}`);
        return this.messages;
    };

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        this.messageNuevoId ++;
        const message = {
            author: mensaje.author,
            fecha: mensaje.fecha,
            text: mensaje.text,
            id: this.messageNuevoId
        };
        this.messages.push(message);
        return response;
    };

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let response = false;
        try {
            consoleLogger.info(`cant productos en carrito ${this.carrito.productos.length}`);
            if (this.carrito.productos.length > 0) {
                for (let i:number = 0; i < this.carrito.productos.length; i++) {
                    if (this.carrito.productos[i].id == parseInt(id)) {
                        consoleLogger.info("el producto ya se encuentra en el carrito")
                        response = false;
                        return response;
                    }
                } 
            }
            for (let i:number = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == parseInt(id)) {
                    const prod: Producto = {
                        code: this.productos[i].code,
                        title:this.productos[i].title,
                        description: this.productos[i].description,
                        price:this.productos[i].price,
                        thumbnail: this.productos[i].thumbnail,
                        stock: this.productos[i].stock,
                        timestamp: this.productos[i].timestamp,
                        id: this.productos[i].id
                    }
                    this.carrito.productos.push(prod);
                    response = true;
                    return response;
                };
            };
            response = false;
            consoleLogger.warn ("producto no encontrado");
              
        } catch (error){
            errorLogger.error(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let productos = [];
        consoleLogger.info("entro a buscar por id")
        if (this.carrito.productos.length > 0) {
            for (const prod of this.carrito.productos) {
                if (prod.id === parseInt(id)) {
                    const producto = {
                        code: prod.code,
                        title: prod.title,
                        description: prod.description,
                        price: prod.price,
                        thumbnail: prod.thumbnail,
                        stock: prod.stock,
                        timestamp: prod.timestamp
                    }
                    productos.push(producto)    
                    return productos;
                } 
            }
            consoleLogger.info("no encontro el producto en el carrito");
            return false; 
        } else {
            consoleLogger.info ("el carrito no tiene productos");
            return false;
        }
        
    };    
    
    async listarProdsCarrito() {
        let productos = [];
        try {
            for (const prod of this.carrito.productos) {
                consoleLogger.info(`productos del carrito ${this.carrito.productos}`)
                const producto = {
                    code: prod.code,
                    title: prod.title,
                    description: prod.description,
                    price: prod.price,
                    thumbnail: prod.thumbnail,
                    stock: prod.stock,
                    timestamp: prod.timestamp
                }
                productos.push(producto)   
            } 
            return productos;
        } catch (error) {
            errorLogger.error(error);
            return productos;
        }
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = false;
        try {
            for (let i:number = 0; i < this.carrito.productos.length; i++) {
                if (this.carrito.productos[i].id == parseInt(id)) {
                    this.carrito.productos.splice(i, 1);
                    response = true;
                };
            };
        }
        catch (error){
            errorLogger.error(error);
        }
        return response;
    };
};

export default MemoryDao;



