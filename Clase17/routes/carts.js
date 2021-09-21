"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var carritoRouter = express_1.default.Router();
var carrito_js_1 = __importDefault(require("../modelo/carrito.js"));
var miCarrito = new carrito_js_1.default();
//listar carrito
carritoRouter.get('/listar/:id?', function (req, res) {
    // creo una variable general para almacenar producto
    var producto;
    if (req.params.id) {
        // si hay id le asigno el producto que traiga
        producto = [miCarrito.buscarProducto(parseInt(req.params.id))];
    }
    else {
        // si no hay id traigo todo
        producto = miCarrito.listarProductos();
    }
    // le devuelvo al fetch un json con lo que obtuve
    res.json(producto);
});
//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', function (req, res) {
    var carrito = miCarrito.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    res.json(carrito);
});
//borro producto del carrito
carritoRouter.delete('/borrar/:id', function (req, res) {
    try {
        var productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
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
exports.default = carritoRouter;
