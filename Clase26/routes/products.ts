import express from "express";
const productosRouter = express.Router();
import Productos from "../modelo/productos.js";
import { authorizationMiddleware } from "../middleware/authorization.js";
const prods = new Productos();
import path from "path";
const __dirname = path.resolve();
const faker = require('faker');
faker.locale = "es";


productosRouter.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/listoProds.html");
});

productosRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
        try {
            console.log("va a buscar productos por id")
            const producto = await prods.buscarProducto(parseInt(req.params.id))
            res.json(producto);
           
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            console.log("va a buscar productos sin parametro")
            const productos = await prods.listarProductos()
            res.json(productos);
        } catch(err) {
            console.log(err)
        }   
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
        const productoBorrado = await prods.borrarProducto(parseInt(req.params.id));
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
productosRouter.put('/actualizar/:id', authorizationMiddleware(), async(req: express.Request, res: express.Response) => {
    try {
        const prodAct = await prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
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

// genero mock de productos con faker
let id = 0;
productosRouter.get('/vista-test/:cant?', (req: express.Request, res: express.Response) => {
    const prodsArray = [];
    const cant = Number(req.params.cant);
    const cantGenerar = isNaN(cant) ? 10 : cant;

    for (let i = 0; i < cantGenerar; i++) {
        prodsArray.push({
            id: ++id,
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.image(),
        });
    }
    res.json(prodsArray);
});


export default productosRouter;