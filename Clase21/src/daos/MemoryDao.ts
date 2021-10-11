import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";

class MemoryDao {
    public productos:Producto[];
    public nuevoId: number;
    public messages: Mensaje[];
    public messageNuevoId: number;

    constructor() {
        this.productos = [];
        this.nuevoId = 0;
        this.messages = [];
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
};

export default MemoryDao;



