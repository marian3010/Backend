import express from "express";
const productosRouter = express.Router();
import Productos from "../modelo/productos.js";
import { authorizationMiddleware } from "../middleware/authorization.js";
const prods = new Productos();
import path from "path";
const __dirname = path.resolve();


productosRouter.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/listoProds.html");
});

productosRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    // creo una variable general para almacenar producto
    let producto
    if (req.params.id) {
        // si hay id le asigno el producto que traiga
        producto = [prods.buscarProducto(parseInt(req.params.id))]
    } else {
    // si no hay id traigo todo
        producto = prods.listarProductos();
    }
    // le devuelvo al fetch un json con lo que obtuve
    res.json(producto);
});

//guardo un nuevo producto
productosRouter.get('/guardar', authorizationMiddleware(), (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/agregoProd.html");
});
productosRouter.post('/guardar', authorizationMiddleware(), (req: express.Request, res: express.Response) => {
    const prod = prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    res.json(prod);
});

//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', authorizationMiddleware(), (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = prods.borrarProducto(parseInt(req.params.id));
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

// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', authorizationMiddleware(), (req: express.Request, res: express.Response) => {
    try {
        const prodAct = prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
        if (prodAct) {
            res.json(prodAct);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    }
});

export default productosRouter;