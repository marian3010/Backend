"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var carritoRouter = express_1.default.Router();
var carrito_js_1 = __importDefault(require("../modelo/carrito.js"));
var miCarrito = new carrito_js_1.default();
//listar carrito
carritoRouter.get('/listar/:id?', function (req, res) {
    fs_1.default.readFile(miCarrito.fileLocation, "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        miCarrito.productos = JSON.parse(contenido);
        var producto;
        if (req.params.id) {
            for (var _i = 0, _a = miCarrito.productos; _i < _a.length; _i++) {
                var prod = _a[_i];
                if (prod.id === parseInt(req.params.id)) {
                    producto = prod;
                }
            }
            console.log(req.params.id);
            console.log(miCarrito.productos);
        }
        else {
            producto = miCarrito.productos;
        }
        res.json(producto);
    });
});
//agrego producto al carrito
/*carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
       if (error) {
            "hubo un error leyendo el archivo de productos"
             return;
        };
        miCarrito.productos = JSON.parse(contenido);
      
    });
    const producto = [miCarrito.buscarProducto(parseInt(req.params.id))];
    miCarrito.archivo.productos.push(producto);
    fs.writeFile(miCarrito.fileLocation, JSON.stringify(miCarrito.archivo, null, "\t"), "utf-8", (error) => {
        if (error) {
            "hubo un error en la escritura del archivo de productos"
             return;
        };
    });
    res.json(miCarrito.productos);
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    fs.readFile(miCarrito.fileLocation, "utf-8", (error, contenido) => {
        if (error) {
             "hubo un error leyendo el archivo de productos"
              return;
         };
         miCarrito.productos = JSON.parse(contenido);
     });
    try {
        const productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            res.json(productoBorrado);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
        
});*/
exports.default = carritoRouter;
