import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import Carrito from "../../modelo/carrito";

class MemoryDao {
    public productos:Producto[];
    public nuevoId: number;
    public messages: Mensaje[];
    public messageNuevoId: number;
    public carrito: Carrito[];

    constructor() {
        this.productos = [];
        this.nuevoId = 0;
        this.messages = [];
        this.messageNuevoId = 0;
        this.carrito = [];
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
        let response = true;
        try {
           for (let i:number = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == id) {
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
        for (const prod of this.carrito.productos) {
            if (prod.id === parseInt(id)) {
                producto = prod;
            }
        } 
        return(producto);
    }; 
    
    async listarProdsCarrito() {
        try {
           return this.carrito.productos;
        } 
        catch (error) {
            console.log(error)
            return false;
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



