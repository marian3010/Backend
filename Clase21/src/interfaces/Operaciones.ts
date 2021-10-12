import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import  Carrito  from "../../modelo/carrito";


export interface Operaciones {
    agregarProducto(producto: Producto): Promise<boolean>
    buscarProducto(id:any): any
    listarProductos(): any
    borrarProducto(id:any): Promise<boolean>
    actualizarProducto(id:any, producto:Producto): Promise<boolean>
    leerMensajes():any
    guardarMensajes(mensaje: Mensaje): Promise<boolean>
    //listarProdsCarrito(): any
    //buscarProdCarrito(id:any): any
    //agregarProdsCarrito(id:any): Promise<boolean>
    //borrarProdsCarrito(id:any): Promise<boolean>
}

