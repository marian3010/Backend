import express from "express";
const productosRouter = express.Router();
import Productos from "../modelo/productos.js";
import { authorizationMiddleware } from "../middleware/authorization.js";
export const prods = new Productos();
import path from "path";
const __dirname = path.resolve();


productosRouter.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/listoProds.html");
});

productosRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    try {
        let idBuscar = (req.params.id);
        console.log("parametro a buscar idBuscar",idBuscar)
        if (idBuscar) {
            console.log("va a buscar productos por id")
            const producto = await prods.buscarProducto(idBuscar)
            res.json(producto);
           
        } else {
            console.log("va a buscar productos sin parametro")
            const productos = await prods.listarProductos(req.body.filtro, req.body.valorDesde, req.body.valorHasta)
            res.json(productos);
        } 
    } catch(err) {
        console.log(err)
    };
});

//guardo un nuevo producto
productosRouter.get('/guardar', authorizationMiddleware(), (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/agregoProd.html");
});
productosRouter.post('/guardar', authorizationMiddleware(), async (req: express.Request, res: express.Response) => {
    try {
        const prod = await prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
        res.json(prod);
    } catch(err) {
        console.log(err)
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
            res.send(false);
        };
    } catch (err) {
        console.log("hubo un error", err);
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
            res.send(false);
        };
    } catch (err) {
        console.log("hubo un error", err);
    }
});

export default productosRouter;