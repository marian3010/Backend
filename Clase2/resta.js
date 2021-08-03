"use strict";
exports.__esModule = true;
exports.Resta = void 0;
var Resta = /** @class */ (function () {
    function Resta(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    ;
    Resta.prototype.getResultado = function () {
        var resultado = this.num1 - this.num2;
        return resultado;
    };
    ;
    return Resta;
}());
exports.Resta = Resta;
;
