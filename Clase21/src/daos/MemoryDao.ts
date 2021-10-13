import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}
interface AProductos {
    productos: Producto[];
}
    
class MemoryDao implements Operaciones {
    public archivo: AProductos | Cart
    public nuevoId: number
    public messages: Mensaje[]
    public messageNuevoId: number;
    
    constructor() {
        this.nuevoId = 0;
        this.archivo = {
            productos: [],
        };
        this.messages= [];
        this.messageNuevoId = 0;
    }    
   
    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        this.nuevoId ++;
        const prod = {
            code: producto.code,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            stock: producto.stock,
            timestamp: producto.timestamp,
            id: this.nuevoId
        };
        this.archivo.productos.push(prod);
        return response;
    };

    async buscarProducto(id:any) {
        for (let i = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                console.log("producto encontrado", this.archivo.productos[i]);
                return this.archivo.productos[i];
            };
        };
    };

    async listarProductos() {
        console.log("lista de productos en memoria",this.archivo.productos);
        return this.archivo.productos;
    };

    async borrarProducto(id:any): Promise<boolean> {
        for (let i:number = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                console.log("producto borrado", this.archivo.productos[i]);
                this.archivo.productos.splice(i, 1);
                return true;
            };
        };
        return false;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        for (let i = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                this.archivo.productos[i].code = producto.code;
                this.archivo.productos[i].title = producto.title;
                this.archivo.productos[i].description = producto.description;
                this.archivo.productos[i].price = producto.price;
                this.archivo.productos[i].thumbnail = producto.thumbnail;
                this.archivo.productos[i].stock = producto.stock;
                this.archivo.productos[i].timestamp = producto.timestamp;
                const prodActualizado = this.archivo.productos[i];
                return true;
            };
        };
        return false;
    };

    async leerMensajes() {
        console.log("lista de mensajes en memoria",this.messages);
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
        let response = true;
        try {
           for (let i:number = 0; i < this.archivo.productos.length; i++) {
                if (this.archivo.productos[i].id == id) {
                    const prod: Producto = {
                        code: this.archivo.productos[i].code,
                        title:this.archivo.productos[i].title,
                        description: this.archivo.productos[i].description,
                        price:this.archivo.productos[i].price,
                        thumbnail: this.archivo.productos[i].thumbnail,
                        stock: this.archivo.productos[i].stock,
                        timestamp: this.archivo.productos[i].timestamp,
                        id: this.archivo.productos[i].id
                    }
                    this.archivo.productos.push(prod);
                    console.log("producto agregado al carrito", prod);
                };
            };
            response = false;
            console.log ("producto no encontrado");
        } catch (error){
            console.log(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let producto
        for (const prod of this.archivo.productos) {
            if (prod.id === parseInt(id)) {
                producto = prod;
            }
        } 
        return(producto);
    }; 
    
    async listarProdsCarrito() {
        try {
           return this.archivo.productos;
        } 
        catch (error) {
            console.log(error)
            return false;
        }
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            for (let i:number = 0; i < this.archivo.productos.length; i++) {
                if (this.archivo.productos[i].id == parseInt(id)) {
                    this.archivo.productos.splice(i, 1);
                };
            };
        }
        catch (error){
            console.log(error);
            response = false;
        }
        return response;
    };
};

export default MemoryDao;



