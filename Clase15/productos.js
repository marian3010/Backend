"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var Producto = /** @class */ (function () {
    function Producto(id, fechaAlta, fechaActualizacion, code, title, description, price, thumbnail, stock) {
        this.id = id;
        this.fechaAlta = fechaAlta;
        this.fechaActualizacion = fechaActualizacion;
        this.code = code;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
    return Producto;
}());
var Productos = /** @class */ (function () {
    function Productos() {
        this.productos = new Array();
    }
    Productos.prototype.agregarProducto = function (code, title, description, price, thumbnail, stock) {
        var nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        var producto = { code: code, title: title, description: description, price: price, thumbnail: thumbnail, stock: stock, id: nuevoId, fechaAlta: (0, moment_1.default)().format('DD/MM/YYYY, hh:mm:ss'), fechaActualizacion: (0, moment_1.default)().format('DD/MM/YYYY, hh:mm:ss') };
        this.productos.push(producto);
        return this.productos[this.productos.length - 1];
    };
    ;
    Productos.prototype.buscarProducto = function (id) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            }
            ;
        }
        ;
    };
    ;
    Productos.prototype.listarProductos = function () {
        return this.productos;
    };
    ;
    Productos.prototype.borrarProducto = function (id) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                var prodBorrado = this.productos[i];
                this.productos.splice(i, 1);
                return prodBorrado;
            }
            ;
        }
        ;
    };
    ;
    Productos.prototype.actualizarProducto = function (code, title, description, price, thumbnail, stock, id) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].code = code;
                this.productos[i].title = title;
                this.productos[i].description = description;
                this.productos[i].price = price;
                this.productos[i].thumbnail = thumbnail;
                this.productos[i].stock = stock;
                this.productos[i].fechaActualizacion = (0, moment_1.default)().format('DD/MM/YYYY, hh:mm:ss');
                var prodActualizado = this.productos[i];
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
