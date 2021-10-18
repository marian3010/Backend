import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import Carrito from "../../modelo/carrito";

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}
    
class MemoryDao implements Operaciones {
    public carrito: Cart
    public nuevoCartId: number
    public messages: Mensaje[]
    public messageNuevoId: number;
    public nuevoProdId:number
    public productos: Producto []
    
    constructor() {
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
   
    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        this.nuevoProdId ++;
        const prod = {
            code: producto.code,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            stock: producto.stock,
            timestamp: producto.timestamp,
            id: this.nuevoProdId
        };
        this.productos.push(prod);
        return response;
    };

    async buscarProducto(id:any) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                console.log("producto encontrado", this.productos[i]);
                return this.productos[i];
            };
        };
    };

    async listarProductos() {
        console.log("lista de productos en memoria",this.productos);
        return this.productos;
    };

    async borrarProducto(id:any): Promise<boolean> {
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                console.log("producto borrado", this.productos[i]);
                this.productos.splice(i, 1);
                return true;
            };
        };
        return false;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
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
        let response = false;
        try {
            console.log("cant productos en carrito", this.carrito.productos.length);
            if (this.carrito.productos.length > 0) {
                for (let i:number = 0; i < this.carrito.productos.length; i++) {
                    if (this.carrito.productos[i].id == parseInt(id)) {
                        console.log("el producto ya se encuentra en el carrito")
                        response = false;
                        return response;
                    }
                } 
            }
            console.log("cant productos en memoria", this.productos.length);
            for (let i:number = 0; i < this.productos.length; i++) {
                console.log("id parametro", parseInt(id));
                console.log("id de array productos", this.productos[i].id);
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
                    console.log("producto agregado al carrito", prod);
                    response = true;
                    return response;
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
        let productos = [];
        console.log("productos del carrito", this.carrito.productos);
        if (this.carrito.productos.length > 0) {
            for (const prod of this.carrito.productos) {
                console.log("producto del carrito", prod)
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
                    console.log("producto para devolver", producto)
                    productos.push(producto)    
                    console.log ("array de productos", productos)
                    return productos;
                } 
            }
            console.log("no encontro el producto en el carrito");
            return false; 
        } else {
            console.log ("el carrito no tiene productos");
            return false;
        }
        
    };    
    
    async listarProdsCarrito() {
        let productos = [];
        try {
            for (const prod of this.carrito.productos) {
                console.log("producto leido del carrito", prod)
                const producto = {
                    code: prod.code,
                    title: prod.title,
                    description: prod.description,
                    price: prod.price,
                    thumbnail: prod.thumbnail,
                    stock: prod.stock,
                    timestamp: prod.timestamp
                }
                console.log("producto a pushear", producto)
                productos.push(producto)   
                console.log("array de productos", productos) 
            } 
            return productos;
        } catch (error) {
            console.log(error)
            return productos;
        }
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            for (let i:number = 0; i < this.carrito.productos.length; i++) {
                if (this.carrito.productos[i].id == parseInt(id)) {
                    this.carrito.productos.splice(i, 1);
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



