"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Producto = /** @class */ (function () {
    function Producto(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    return Producto;
}());
var Productos = /** @class */ (function () {
    function Productos() {
        this.productos = new Array();
    }
    Productos.prototype.agregarProducto = function (title, price, thumbnail) {
        var nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        var producto = { title: title, price: price, thumbnail: thumbnail, id: nuevoId };
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
    Productos.prototype.actualizarProducto = function (title, price, thumbnail, id) {
        for (var i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].title = title;
                this.productos[i].price = price;
                this.productos[i].thumbnail = thumbnail;
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
