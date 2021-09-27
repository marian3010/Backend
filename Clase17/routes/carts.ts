import express from "express";
import fs from "fs";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
const miCarrito: Carrito = new Carrito();



//listar carrito
carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
        if (error) {
             "hubo un error leyendo el archivo de productos"
              return;
         };
         miCarrito.productos = JSON.parse(contenido);
         let producto
         if (req.params.id) {
             for (const prod of miCarrito.productos) {
                 if (prod.id === parseInt(req.params.id)) {
                     producto = prod;
                 }

             }
             console.log(req.params.id);
             console.log(miCarrito.productos);
         } else {
             producto = miCarrito.productos;
         }
         res.json(producto);
     }); 
});

//agrego producto al carrito
/*carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
       if (error) {
            "hubo un error leyendo el archivo de productos"
             return;
        };
        miCarrito.productos = JSON.parse(contenido);
      
    });
    const producto = [miCarrito.buscarProducto(parseInt(req.params.id))];
    miCarrito.archivo.productos.push(producto);
    fs.writeFile(miCarrito.fileLocation, JSON.stringify(miCarrito.archivo, null, "\t"), "utf-8", (error) => {
        if (error) {
            "hubo un error en la escritura del archivo de productos"
             return;
        };
    });
    res.json(miCarrito.productos);
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
        if (error) {
             "hubo un error leyendo el archivo de productos"
              return;
         };
         miCarrito.productos = JSON.parse(contenido);
     }); 
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
        
});*/

export default carritoRouter;