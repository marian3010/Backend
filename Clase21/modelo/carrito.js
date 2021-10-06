"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carrito = /** @class */ (function () {
    function Carrito() {
        this.productos = [];
        this.id = Carrito.contador;
        this.timestamp = Date.now();
        Carrito.contador++;
        this.fileLocation = "./data/carritos.txt";
    }
    ;
    Carrito.contador = 1;
    return Carrito;
}());
;
exports.default = Carrito;
