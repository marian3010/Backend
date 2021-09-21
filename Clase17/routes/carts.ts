import express from "express";
import fs from "fs";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
const miCarrito: Carrito = new Carrito();
import Producto from "../modelo/productos.js";


//listar carrito
carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
     // creo una variable general para almacenar producto
     let producto
     if (req.params.id) {
         // si hay id le asigno el producto que traiga
         producto = [miCarrito.buscarProducto(parseInt(req.params.id))];
     } else {
     // si no hay id traigo todo
         producto = miCarrito.listarProductos();
     }
     // le devuelvo al fetch un json con lo que obtuve
     res.json(producto);
 });

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
       if (error) {
            "hubo un error leyendo el archivo de productos"
             return;
        };
        miCarrito.archivo = JSON.parse(contenido);
    });
    const producto = [miCarrito.buscarProducto(parseInt(req.params.id))];
    miCarrito.archivo.productos.push(producto);
    fs.writeFile(miCarrito.fileLocation, JSON.stringify(miCarrito.archivo, null, "\t"), "utf-8", (error) => {
        if (error) {
            "hubo un error en la escritura del archivo de productos"
             return;
        };
    });
    res.json(miCarrito.archivo.productos);
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            res.json(productoBorrado);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
        
});

export default carritoRouter;