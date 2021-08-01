var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function operacion(num1, num2, tipo) {
    var _this = this;
    return new Promise(function (resolve, rejected) { return __awaiter(_this, void 0, void 0, function () {
        var claseSuma, suma, resultado, claseResta, resta, resultado, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(tipo === "suma")) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("./suma"); })];
                case 1:
                    claseSuma = (_a.sent()).Suma;
                    suma = new claseSuma(num1, num2);
                    resultado = suma.getResultado();
                    resolve(resultado);
                    return [3 /*break*/, 5];
                case 2:
                    if (!(tipo === "resta")) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("./resta"); })];
                case 3:
                    claseResta = (_a.sent()).Resta;
                    resta = new claseResta(num1, num2);
                    resultado = resta.getResultado();
                    resolve(resultado);
                    return [3 /*break*/, 5];
                case 4: throw new Error("el tipo de operación no es válido");
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    rejected(e_1.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
;
function operaciones() {
    operacion(10, 25, "pepe").then(function (x) { return console.log(x); })["catch"](function (x) { return console.log(x); });
    operacion(20, 12, "resta").then(function (x) { return console.log(x); })["catch"](function (x) { return console.log(x); });
    operacion(100, 32, "suma").then(function (x) { return console.log(x); })["catch"](function (x) { return console.log(x); });
}
;
operaciones();
