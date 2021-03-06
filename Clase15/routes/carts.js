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
    fs_1.default.readFile(miCarrito.fileLocation, "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        miCarrito.archivo = JSON.parse(contenido);
    });
    fs_1.default.readFile('./data/productos.txt', "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        var prodsArchivo = JSON.parse(contenido);
        for (var i = 0; i < prodsArchivo.productos.length; i++) {
            if (prodsArchivo.productos[i].id === parseInt(req.params.id_producto)) {
                var prod = prodsArchivo.productos[i];
                miCarrito.archivo.productos.push(prod);
                fs_1.default.writeFile(miCarrito.fileLocation, JSON.stringify(miCarrito.archivo, null, "\t"), "utf-8", function (error) {
                    if (error) {
                        "hubo un error en la escritura del archivo de productos";
                        return;
                    }
                    ;
                });
                res.json(miCarrito.archivo.productos);
                return;
            }
            ;
        }
        ;
    });
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
