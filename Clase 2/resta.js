var Resta = /** @class */ (function () {
    function Resta(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    Resta.prototype.getResultado = function () {
        return this.num1 - this.num2;
    };
    return Resta;
}());
module.exports = {
    Resta: Resta
};
