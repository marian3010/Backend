import {Operaciones} from "../interfaces/Operaciones";
import Productos, { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import fs from "fs";


//interface Cart {
//    id: number;
//    timestamp: number;
//    productos: Producto[];
//}
    
interface AProductos {
    productos: Producto[];
}
const fileProductos = "./data/productos.txt";
const fileMensajes = "./data/mensajes.txt";

class FsDao implements Operaciones {
    //public archivo: AProductos | Cart
    public archivo: AProductos
    public nuevoId: number
    
    constructor() {
        this.nuevoId = 0;
        this.archivo = {
            productos: [],
        };
        
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        try {
            this.archivo = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
        }
        catch (error) {
            console.log(error);
            //response = false;
        } 
        this.nuevoId ++
        let prod = {
            code: producto.code,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            stock: producto.stock,
            timestamp: producto.timestamp,
            id: this.nuevoId
        };
        console.log ("prod a guardar",prod);
        this.archivo.productos.push(prod);
        try {
            await fs.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8");
        } catch (error) {
            console.log(error);
            response = false;
        };
        return response;
    };

    async buscarProducto(id:any) {
        try {
            console.log('buscar prod en fs')
            this.archivo = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < this.archivo.productos.length; i++) {
                if (this.archivo.productos[i].id == id) {
                    const prod: Producto = this.archivo.productos[i]
                    console.log("devuelve prod encontrado", prod);
                    return prod;
                };
            };
            console.log("no encontro el producto")
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };

    async listarProductos() {
        try {
            console.log("listar productos desde productos.txt")
            this.archivo = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
                console.log("productos encontrados", this.archivo.productos)
                return this.archivo.productos;
        } 
        catch (error) {
            console.log(error)
            return false;
        }
    };    
    
    async borrarProducto(id:any): Promise<boolean> {
        let response = true;
        try {
            this.archivo = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < this.archivo.productos.length; i++) {
                if (this.archivo.productos[i].id == id) {
                    this.archivo.productos.splice(i, 1);
                    await fs.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8");
                };
            };
        }
        catch (error){
            console.log(error);
            response = false;
        }
        return response;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let response = true;
        try {
            this.archivo = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < this.archivo.productos.length; i++) {
                if (this.archivo.productos[i].id == id) {
                    this.archivo.productos[i].code = producto.code;
                    this.archivo.productos[i].title = producto.title;
                    this.archivo.productos[i].description = producto.description;
                    this.archivo.productos[i].price = producto.price;
                    this.archivo.productos[i].thumbnail = producto.thumbnail;
                    this.archivo.productos[i].stock = producto.stock;
                    this.archivo.productos[i].timestamp = producto.timestamp;
                    await fs.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8");
                };
            };
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
    };

    async leerMensajes() {
        let mensajesArray: Mensaje[] = []
        try {
            console.log("listar mensajes desde mensajes.txt")
            mensajesArray = JSON.parse(await fs.promises.readFile(fileMensajes, "utf-8"))
                console.log("mensajes encontrados", mensajesArray)
                return mensajesArray;
        } 
        catch (error) {
            console.log(error)
            return false;
        }
    };
    
    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        let mensajesArray: Mensaje[] = []
        try {
            mensajesArray = JSON.parse(await fs.promises.readFile(fileMensajes, "utf-8"))
        }
        catch (error) {
            console.log(error);
        } 
        this.nuevoId ++
        let message = {
            author: mensaje.author,
            fecha: mensaje.fecha,
            text: mensaje.text
        };
        console.log ("mensaje a guardar",message);
        mensajesArray.push(message);
        try {
            await fs.promises.writeFile(fileMensajes, JSON.stringify(mensajesArray, null, "\t"), "utf-8");
        } catch (error) {
            console.log(error);
            response = false;
        };
        return response;
    };
}
export default FsDao;