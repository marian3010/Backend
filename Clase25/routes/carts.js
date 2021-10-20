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
var mariaDB_1 = __importDefault(require("../db/mariaDB"));
var knex_1 = __importDefault(require("knex"));
var knexo = (0, knex_1.default)(mariaDB_1.default);
//listar carrito
carritoRouter.get('/listar/:id?', function (req, res) {
    fs_1.default.readFile(miCarrito.fileLocation, "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        var carrito = JSON.parse(contenido);
        var listaProductos = carrito.productos;
        var producto;
        if (req.params.id) {
            for (var _i = 0, listaProductos_1 = listaProductos; _i < listaProductos_1.length; _i++) {
                var prod = listaProductos_1[_i];
                if (prod.id === parseInt(req.params.id)) {
                    producto = prod;
                }
            }
        }
        else {
            producto = listaProductos;
        }
        res.json(producto);
    });
});
//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', function (req, res) {
    fs_1.default.readFile(miCarrito.fileLocation, "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        var carrito = JSON.parse(contenido);
        knexo.from("productos")
            .select("*")
            .where("id", "=", parseInt(req.params.id_producto))
            .then(function (rows) {
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                carrito.productos.push({ code: row["code"], title: row["title"], description: row["description"], price: row["price"], thumbnail: row["thumbnail"], stock: row["stock"], timestamp: row["timestamp"], id: row["id"] });
            }
            fs_1.default.writeFile(miCarrito.fileLocation, JSON.stringify(carrito, null, "\t"), "utf-8", function (error) {
                if (error) {
                    "hubo un error en la escritura del archivo de productos";
                    return;
                }
                ;
            });
            res.json(carrito.productos);
        });
    });
});
//borro producto del carrito
carritoRouter.delete('/borrar/:id', function (req, res) {
    fs_1.default.readFile(miCarrito.fileLocation, "utf-8", function (error, contenido) {
        if (error) {
            "hubo un error leyendo el archivo de productos";
            return;
        }
        ;
        var carrito = JSON.parse(contenido);
        if (req.params.id) {
            for (var i = 0; i < carrito.productos.length; i++) {
                if (carrito.productos[i].id == parseInt(req.params.id)) {
                    var prodBorrado = carrito.productos[i];
                    carrito.productos.splice(i, 1);
                    fs_1.default.writeFile(miCarrito.fileLocation, JSON.stringify(carrito, null, "\t"), "utf-8", function (error) {
                        if (error) {
                            "hubo un error en la escritura del archivo de productos";
                            return;
                        }
                        ;
                    });
                    res.json(prodBorrado);
                }
                ;
            }
            ;
            console.log("no se encontró el producto a borrar");
        }
        else {
            console.log("no se pasó parámetro");
        }
    });
});
exports.default = carritoRouter;
