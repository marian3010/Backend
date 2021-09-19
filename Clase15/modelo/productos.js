"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Productos = /** @class */ (function () {
    function Productos() {
        this.productos = new Array();
    }
    Productos.prototype.agregarProducto = function (code, title, description, price, thumbnail, stock) {
        var _this = this;
        fs_1.default.readFile("./data/productos.txt", "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.productos = JSON.parse(contenido);
        });
        var nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        var producto = { code: code, title: title, description: description, price: price, thumbnail: thumbnail, stock: stock, id: nuevoId, timestamp: Date.now() };
        this.productos.push(producto);
        fs_1.default.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", function (error) {
            if (error) {
                "hubo un error en la escritura del archivo de productos";
                return;
            }
            ;
        });
        return this.productos;
    };
    ;
    Productos.prototype.buscarProducto = function (id) {
        var _this = this;
        fs_1.default.readFile("./data/productos.txt", "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.productos = JSON.parse(contenido);
        });
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            }
            ;
        }
        ;
        return this.productos = [];
    };
    ;
    Productos.prototype.listarProductos = function () {
        var _this = this;
        fs_1.default.readFile("./data/productos.txt", "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.productos = JSON.parse(contenido);
        });
        return this.productos;
    };
    ;
    Productos.prototype.borrarProducto = function (id) {
        var _this = this;
        fs_1.default.readFile("./data/productos.txt", "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.productos = JSON.parse(contenido);
        });
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                var prodBorrado = this.productos[i];
                this.productos.splice(i, 1);
                fs_1.default.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", function (error) {
                    if (error) {
                        "hubo un error en la escritura del archivo de productos";
                        return;
                    }
                    ;
                });
                return prodBorrado;
            }
            ;
        }
        ;
    };
    ;
    Productos.prototype.actualizarProducto = function (code, title, description, price, thumbnail, stock, id) {
        var _this = this;
        fs_1.default.readFile("./data/productos.txt", "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.productos = JSON.parse(contenido);
        });
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].code = code;
                this.productos[i].title = title;
                this.productos[i].description = description;
                this.productos[i].price = price;
                this.productos[i].thumbnail = thumbnail;
                this.productos[i].stock = stock;
                this.productos[i].timestamp = Date.now();
                var prodActualizado = this.productos[i];
                fs_1.default.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", function (error) {
                    if (error) {
                        "hubo un error en la escritura del archivo de productos";
                        return;
                    }
                    ;
                });
                return prodActualizado;
            }
            ;
        }
        ;
    };
    ;
    return Productos;
}());
;
exports.default = Productos;
