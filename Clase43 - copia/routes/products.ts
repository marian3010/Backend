import express from "express";
const productosRouter = express.Router();
import Productos from "../modelo/productos.js";
import { authorizationMiddleware } from "../middleware/authorization.js";
export const prods = new Productos();
import path from "path";
const __dirname = path.resolve();
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'
const { graphqlHTTP } = require("express-graphql");
import {schema, root } from '../graphql/products';

productosRouter.get('/', (_req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/listoProds.html");
});

productosRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    try {
        let idBuscar = (req.params.id);
        consoleLogger.info(`parametro a buscar idBuscar ${idBuscar}`)
        if (idBuscar) {
            consoleLogger.info("va a buscar productos por id")
            const producto = await prods.buscarProducto(idBuscar)
            res.json(producto);
           
        } else {
            consoleLogger.info("va a buscar productos sin parametro")
            const productos = await prods.listarProductos(req.body.filtro, req.body.valorDesde, req.body.valorHasta)
            res.json(productos);
        } 
    } catch(err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    };
});

//guardo un nuevo producto
productosRouter.get('/guardar', authorizationMiddleware(), (_req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/agregoProd.html");
});
productosRouter.post('/guardar', authorizationMiddleware(), async (req: express.Request, res: express.Response) => {
    try {
        const prod = await prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
        res.json(prod);
    } catch(err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    }    
});

//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', authorizationMiddleware(), async (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = await prods.borrarProducto(req.params.id);
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

// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', authorizationMiddleware(), async(req: express.Request, res: express.Response) => {
    try {
        const prodAct = await prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, req.params.id);
        if (prodAct) {
            res.json(prodAct);
            return;
        } else {
            warningLogger.warn("falta parámetro ID del producto a actualizar");
            consoleLogger.warn("falta parámetro ID del producto a actualizar");
            res.send(false);
        };
    } catch (err) {
        errorLogger.error(err);
        consoleLogger.error(err);
    }
});

productosRouter.use("/graphql",graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

export default productosRouter;