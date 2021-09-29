import express from "express";
import fs from "fs";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
const miCarrito: Carrito = new Carrito();
import options from '../db/mariaDB';
import knex from "knex";
const knexo = knex(options);

//listar carrito
carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
        if (error) {
            "hubo un error leyendo el archivo de productos"
            return;
        };
        const carrito = JSON.parse(contenido);
        const listaProductos = carrito.productos
        let producto
        if (req.params.id) {
            for (const prod of listaProductos) {
                if (prod.id === parseInt(req.params.id)) {
                    producto = prod;
                }
            }
        } else {
            producto = listaProductos;
        }
         res.json(producto);
     }); 
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
       if (error) {
            "hubo un error leyendo el archivo de productos"
             return;
        };
        const carrito = JSON.parse(contenido);
        knexo.from("productos")
        .select("*")
        .where("id", "=", parseInt(req.params.id_producto))
        .then((rows) => {
            for (const row of rows) {
                carrito.productos.push({code:row["code"],title:row["title"],description:row["description"],price:row["price"],thumbnail:row["thumbnail"],stock:row["stock"],timestamp:row["timestamp"],id:row["id"]});
            }
            fs.writeFile(miCarrito.fileLocation, JSON.stringify(carrito, null, "\t"), "utf-8", (error) => {
                if (error) {
                    "hubo un error en la escritura del archivo de productos"
                    return;
                };
            });
            res.json(carrito.productos);
        });
    });
     
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
        if (error) {
             "hubo un error leyendo el archivo de productos"
              return;
         };
        const carrito = JSON.parse(contenido);
        if (req.params.id) {
            for (let i:number = 0; i < carrito.productos.length; i++) {
                if (carrito.productos[i].id == parseInt(req.params.id)) {
                    const prodBorrado = carrito.productos[i];
                    carrito.productos.splice(i, 1);
                    fs.writeFile(miCarrito.fileLocation, JSON.stringify(carrito, null, "\t"), "utf-8", (error) => {
                        if (error) {
                            "hubo un error en la escritura del archivo de productos"
                            return
                        };
                    });
                    res.json(prodBorrado);
                };
            };
            console.log("no se encontró el producto a borrar");
        } else {
            console.log("no se pasó parámetro")
        }
    }); 
        
});

export default carritoRouter;