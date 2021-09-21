"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Productos = /** @class */ (function () {
    function Productos() {
        this.archivo = {
            productos: []
        };
        this.fileLocation = "./data/productos.txt";
    }
    Productos.prototype.agregarProducto = function (code, title, description, price, thumbnail, stock) {
        var _this = this;
        fs_1.default.readFile(this.fileLocation, "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.archivo = JSON.parse(contenido);
        });
        var nuevoId = 1;
        if (this.archivo.productos.length !== 0) {
            nuevoId = this.archivo.productos[this.archivo.productos.length - 1].id + 1;
        }
        var producto = { code: code, title: title, description: description, price: price, thumbnail: thumbnail, stock: stock, id: nuevoId, timestamp: Date.now() };
        this.archivo.productos.push(producto);
        fs_1.default.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", function (error) {
            if (error) {
                "hubo un error en la escritura del archivo de productos";
                return;
            }
            ;
        });
        return this.archivo.productos;
    };
    ;
    Productos.prototype.buscarProducto = function (id) {
        var _this = this;
        fs_1.default.readFile(this.fileLocation, "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.archivo = JSON.parse(contenido);
        });
        for (var i = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                return this.archivo.productos[i];
            }
            ;
        }
        ;
        return this.archivo.productos = [];
    };
    ;
    Productos.prototype.listarProductos = function () {
        var _this = this;
        fs_1.default.readFile(this.fileLocation, "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.archivo = JSON.parse(contenido);
        });
        return this.archivo.productos;
    };
    ;
    Productos.prototype.borrarProducto = function (id) {
        var _this = this;
        fs_1.default.readFile(this.fileLocation, "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.archivo = JSON.parse(contenido);
        });
        for (var i = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                var prodBorrado = this.archivo.productos[i];
                this.archivo.productos.splice(i, 1);
                fs_1.default.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", function (error) {
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
        fs_1.default.readFile(this.fileLocation, "utf-8", function (error, contenido) {
            if (error) {
                "hubo un error leyendo el archivo de productos";
                return;
            }
            ;
            _this.archivo = JSON.parse(contenido);
        });
        for (var i = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                this.archivo.productos[i].code = code;
                this.archivo.productos[i].title = title;
                this.archivo.productos[i].description = description;
                this.archivo.productos[i].price = price;
                this.archivo.productos[i].thumbnail = thumbnail;
                this.archivo.productos[i].stock = stock;
                this.archivo.productos[i].timestamp = Date.now();
                var prodActualizado = this.archivo.productos[i];
                fs_1.default.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", function (error) {
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
