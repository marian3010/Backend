"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productosRouter = express_1.default.Router();
var productos_js_1 = __importDefault(require("../modelo/productos.js"));
var authorization_js_1 = require("../middleware/authorization.js");
var prods = new productos_js_1.default();
var path_1 = __importDefault(require("path"));
var __dirname = path_1.default.resolve();
productosRouter.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/listoProds.html");
});
productosRouter.get('/listar/:id?', function (req, res) {
    // creo una variable general para almacenar producto
    var producto;
    if (req.params.id) {
        // si hay id le asigno el producto que traiga
        producto = [prods.buscarProducto(parseInt(req.params.id))];
    }
    else {
        // si no hay id traigo todo
        producto = prods.listarProductos();
    }
    // le devuelvo al fetch un json con lo que obtuve
    res.json(producto);
});
//guardo un nuevo producto
productosRouter.get('/guardar', (0, authorization_js_1.authorizationMiddleware)(), function (req, res) {
    res.sendFile(__dirname + "/public/agregoProd.html");
});
productosRouter.post('/guardar', (0, authorization_js_1.authorizationMiddleware)(), function (req, res) {
    var prod = prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    res.json(prod);
});
//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', (0, authorization_js_1.authorizationMiddleware)(), function (req, res) {
    try {
        var productoBorrado = prods.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            res.json(productoBorrado);
            return;
        }
        else {
            res.send({ error: 'producto no encontrado' });
        }
        ;
    }
    catch (err) {
        console.log("hubo un error", err);
    }
    ;
});
// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', (0, authorization_js_1.authorizationMiddleware)(), function (req, res) {
    try {
        var prodAct = prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
        if (prodAct) {
            res.json(prodAct);
            return;
        }
        else {
            res.send({ error: 'producto no encontrado' });
        }
        ;
    }
    catch (err) {
        console.log("hubo un error", err);
    }
});
exports.default = productosRouter;
