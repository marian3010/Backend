import express from "express";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
const miCarrito: Carrito = new Carrito();


//listar carrito
carritoRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
        try {
            console.log("va a buscar productos al carrito por id")
            const producto = await miCarrito.buscarProdCarrito(req.params.id)
            res.json(producto);
           
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            console.log("va a buscar productos sin parametro al carrito")
            const productos = await miCarrito.listarProdsCarrito()
            res.json(productos);
        } catch(err) {
            console.log(err)
        }   
    };
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', async (req: express.Request, res: express.Response) => {
    try {
        const prod = await miCarrito.agregarProdsCarrito(req.params.id_producto);
        res.json(prod);
    } catch(err) {
        console.log(err)
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
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
});

export default carritoRouter;