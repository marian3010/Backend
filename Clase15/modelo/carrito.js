"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var productos_js_1 = require("./productos.js");
var Carrito = /** @class */ (function (_super) {
    __extends(Carrito, _super);
    function Carrito() {
        var _this = _super.call(this) || this;
        _this.archivo = {
            productos: [],
            id: Carrito.contador,
            timestamp: Date.now()
        };
        Carrito.contador++;
        _this.fileLocation = "./data/carritos.txt";
        return _this;
    }
    ;
    Carrito.contador = 1;
    return Carrito;
}(productos_js_1.Productos));
;
exports.default = Carrito;
