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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var productos_js_1 = __importDefault(require("./productos.js"));
var Carrito = /** @class */ (function (_super) {
    __extends(Carrito, _super);
    function Carrito() {
        var _this = _super.call(this) || this;
        _this.id = Carrito.contador;
        Carrito.contador++;
        _this.timestamp = Date.now();
        return _this;
    }
    ;
    Carrito.prototype.getId = function () {
        return this.id;
    };
    Carrito.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    Carrito.contador = 1;
    return Carrito;
}(productos_js_1.default));
;
exports.default = Carrito;
var carrito1 = new Carrito();
console.log("Carrito 1 ID: " + carrito1.getId());
console.log("Carrito 1 Timestamp: " + carrito1.getTimestamp());
console.log("Carrito 1 Timestamp: " + carrito1.getTimestamp());
console.log("Carrito 1 Timestamp: " + carrito1.getTimestamp());
var carrito2 = new Carrito();
console.log("Carrito 2 ID: " + carrito2.getId());
console.log("Carrito 2 Timestamp: " + carrito2.getTimestamp());
