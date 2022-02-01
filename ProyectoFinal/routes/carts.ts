import express from "express";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
import {nombreUsuario} from "./login";
import { buscoDatosUser } from "../model/users.js";
export const miCarrito: Carrito = new Carrito();
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'
import {gmailCompra, smsCompra, wappCompra} from '../comunicacion'


//listar productos del carrito
carritoRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    try {
        let idBuscar = (req.params.id);
        if (idBuscar) {
            consoleLogger.info(`busca productos en el carrito con id ${idBuscar}`)
            const producto = await miCarrito.buscarProdCarrito(idBuscar)
            res.json(producto);
        } else {
            consoleLogger.info("va a buscar productos sin parametro al carrito")
            const productos = await miCarrito.listarProdsCarrito()
            res.json(productos);
        } 
    } catch(err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    }   
   
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto/:cant', async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.id_producto) {
            const prod = await miCarrito.agregarProdsCarrito(req.params.id_producto, parseInt(req.params.cant));
            res.json(prod);
        } else {
            warningLogger.warn("falta el parámetro ID del producto a agregar al carrito");
            consoleLogger.warn("falta el parámetro ID del producto a agregar al carrito");
            res.send({ error: 'debe indicar el id de producto a agregar' });
        }
    } catch(err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    }    
       
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', async (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = await miCarrito.borrarProdsCarrito(req.params.id);
        if (productoBorrado) {
            res.json(productoBorrado);
            return;
        } else {
            warningLogger.warn("falta parámetro ID del producto a borrar");
            consoleLogger.warn("falta parámetro ID del producto a borrar");
            res.send(false);
        };
    } catch (err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    };
});

//ruta para comprar el carrito
carritoRouter.post('/comprar/:id', async (req: express.Request, res: express.Response) => {
    if (!nombreUsuario) {
        consoleLogger.warn("Usuario no logueado, no se puede completar la compra");
        res.send({ error: 'Usuario no logueado, no se puede completar la compra. Debe loguearse.' });
    } else {

        try {
            if (req.params.id) {
                const productos = await miCarrito.listarProdsCarrito()
                let prodList = [];
                let producto = {};
                let listaProds = "";
                let n = 1;
                for (const prod of productos) {
                    producto = {
                        idProducto: prod.id,
                        codProducto: prod.code,
                        descripcion: prod.description,
                        precioUnitario: prod.price,
                        cantidad: prod.cantidad,
                        precioTotal: prod.cantidad * prod.price
                    }
                    prodList.push(producto)
                    listaProds = listaProds + `${n} - CodProducto: ${prod.code}, Descripcion: ${prod.description}, Precio Unitario: ${prod.price}, Cantidad: ${prod.cantidad}, Precio Total: ${prod.cantidad*prod.price} // `
                    n++;
                }  
                consoleLogger.info(`nombreUsuario ${nombreUsuario}`);
                const user = await buscoDatosUser(nombreUsuario);
                const ordenNro = await miCarrito.generarOrden(user.email, prodList);
                gmailCompra(listaProds,user.username, user.email, ordenNro);
                wappCompra(listaProds,user.username, user.email, ordenNro);
                smsCompra(user.phone, ordenNro);
                res.json(productos);
            } else {
                warningLogger.warn("falta el parámetro ID del carrito");
                consoleLogger.warn("falta el parámetro ID del carrito");
                res.send({ error: 'debe indicar el id del carrito a comprar' });
            }
        } catch(err) {
            errorLogger.error(err);
            consoleLogger.error(err);
        }    
    };   
});

export default carritoRouter;