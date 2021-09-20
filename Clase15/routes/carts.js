"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var carritoRouter = express_1.default.Router();
//listar carrito
//carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
//    fs.readFile("./data/carrito.txt", "utf-8", (error, contenido) => {
//       if (error) {
//           "hubo un error leyendo el archivo del carrito"
//           return
//        };
//        const miCarrito = JSON.parse(contenido);
//    });
//    if (req.params.id) {
//        try {
/*            const producto = miCarrito.buscarProducto(parseInt(req.params.id));
            if (producto) {
                io.sockets.emit('listCarrito', miCarrito.listarProductos());
                res.sendFile(__dirname + "/public/carrito.html");
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            }
        } catch (err) {
            console.log("hubo un error", err);
        }
    } else {

    }
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    miCarrito.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    io.sockets.emit('listCarrito', miCarrito.listarProductos());
    res.sendFile(__dirname + "/public/carrito.html");
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            io.sockets.emit('listCarrito', miCarrito.listarProductos());
            res.sendFile(__dirname + "/public/carrito.html");
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
        
});*/
exports.default = carritoRouter;
