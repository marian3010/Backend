import express from "express";
const carritoRouter = express.Router();
import Carrito from "../modelo/carrito.js";
export const miCarrito: Carrito = new Carrito();


//listar carrito
carritoRouter.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    try {
        let idBuscar = (req.params.id);
        console.log("parametro a buscar idBuscar",idBuscar)
        if (idBuscar) {
            console.log("va a buscar productos al carrito por id")
            const producto = await miCarrito.buscarProdCarrito(idBuscar)
            res.json(producto);
        } else {
            console.log("va a buscar productos sin parametro al carrito")
            const productos = await miCarrito.listarProdsCarrito()
            res.json(productos);
        } 
    } catch(err) {
            console.log(err)
    }   
   
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.id_producto) {
            const prod = await miCarrito.agregarProdsCarrito(req.params.id_producto);
            res.json(prod);
        } else {
            res.send({ error: 'debe indicar el id de producto a agregar' });
        }
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