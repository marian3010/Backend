
import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import Carrito from "../../modelo/carrito";
import fs from "fs";

const fileProductos = "./data/productos.txt";
const fileMensajes = "./data/mensajes.txt";
const fileCarrito = "./data/carritos.txt"

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}

class FsDao implements Operaciones {
    public carrito: Cart
    public nuevoCartId: number
        
        constructor() {
            this.nuevoCartId = 1;
            this.carrito = {
                id: this.nuevoCartId,
                timestamp: Date.now(),
                productos: [],
            };
        }
   
    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        let productos = [];
        try {
            productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
        }
        catch (error) {
            console.log(error);
            
        } 
        let nuevoId = 1;
        if (productos.length !== 0) {
            nuevoId = productos[productos.length - 1].id + 1;
        }
        let prod = {
            code: producto.code,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            stock: producto.stock,
            timestamp: producto.timestamp,
            id: nuevoId
        };
        console.log ("prod a guardar",prod);
        productos.push(prod);
        await fs.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8");
        return response;
    };

    async buscarProducto(id:any) {
        try {
            console.log('buscar prod en fs')
            let productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
            for (let i:number = 0; i < productos.length; i++) {
                if (productos[i].id == parseInt(id)) {
                    const prod: Producto = productos[i]
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
        let productos = [];
        try {
            console.log("listar productos desde productos.txt")
            const prods = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
                console.log("productos encontrados", prods)
                for (const row of prods) {
                    console.log("row", row)
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
                    console.log("prod a agregar al array", producto)
                    productos.push(producto);  
                }
        } 
        catch (error) {
            console.log(error)
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
            console.log(error);
            response = false;
        }
        return response;
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let response = true;
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
            console.log ("mensaje a guardar",message);
            mensajesArray.push(message);
            try {
                await fs.promises.writeFile(fileMensajes, JSON.stringify(mensajesArray, null, "\t"), "utf-8");
            } catch (error) {
                console.log(error);
                response = false;
            };
        }
        catch (error) {
            console.log(error);
            response = false;
        } 
        return response;
    };

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            this.carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
            // recorro los productos del carrito para ver si el producto a agregar ya existe en el carrito
            if (this.carrito.productos.length > 0) {
                for (let i:number = 0; i < this.carrito.productos.length; i++) {
                    if (this.carrito.productos[i].id == id) {
                        console.log("el producto ya existe en el carrito");
                        response = false;
                        return response;
                    }
                } 
            }
        } catch (error){
            console.log(error);
        }
        let productos = []; 
        try {
            productos = JSON.parse(await fs.promises.readFile(fileProductos, "utf-8"))
        } catch(error) {
            console.log(error);
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
                    id: productos[i].id
                }
                this.carrito.productos.push(prod);
                await fs.promises.writeFile(fileCarrito, JSON.stringify(this.carrito, null, "\t"), "utf-8")
                console.log("producto agregado al carrito", prod);
                return response;
            };
        };
        response = false;
        console.log ("producto no encontrado");
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        const carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
        const listaProductos = carrito.productos
        let producto = [];
        for (const prod of listaProductos) {
            if (prod.id === parseInt(id)) {
                producto = prod;
            }
        } 
        return(producto);
    }; 
    
    async listarProdsCarrito() {
        let carrito = [];
        try {
            console.log("listar productos del carrito desde carrito.txt")
            carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
                console.log("productos encontrados", carrito.productos)
                return carrito.productos;
        } 
        catch (error) {
            console.log(error)
            return false;
        }
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            let carrito = JSON.parse(await fs.promises.readFile(fileCarrito, "utf-8"))
            for (let i:number = 0; i < carrito.productos.length; i++) {
                if (carrito.productos[i].id == parseInt(id)) {
                    carrito.productos.splice(i, 1);
                    await fs.promises.writeFile(fileCarrito, JSON.stringify(carrito, null, "\t"), "utf-8");
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
export default FsDao;