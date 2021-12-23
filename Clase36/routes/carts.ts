import express from "express";
import session from 'express-session';
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
export const miCarrito: Carrito = new Carrito();
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'
import {gmailCompra, smsCompra, wappCompra} from '../comunicacion'

//listar carrito
carritoRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    try {
        let idBuscar = (req.params.id);
        consoleLogger.info(`parametro a buscar idBuscar ${idBuscar}`)
        if (idBuscar) {
            consoleLogger.info("va a buscar productos al carrito por id")
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
carritoRouter.post('/agregar/:id_producto', async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.id_producto) {
            const prod = await miCarrito.agregarProdsCarrito(req.params.id_producto);
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
//agrego producto al carrito
carritoRouter.post('/comprar/:id', async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.id) {
            const productos = await miCarrito.listarProdsCarrito()
            let prodList = "";
            for (const prod of productos) {
                prodList = prodList + `${prod.code} - ${prod.description}, `
            }    
            gmailCompra(prodList);
            wappCompra(prodList);
            smsCompra();
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
       
});


export default carritoRouter;