import { Producto } from "../../modelo/productos";


export interface Operaciones {
    agregarProducto(producto: Producto): Promise<boolean>
    buscarProducto(id:any): any
    listarProductos(): any
    borrarProducto(id:any): Promise<boolean>
    actualizarProducto(id:any, producto:Producto): Promise<boolean>
    //leerMensajes():void
    //guardarMensajes():void
    //listarProdsCarrito():void
    //agregarProdsCarrito():void
    //borrarProdsCarrito():void
}

