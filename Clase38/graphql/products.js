"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = exports.guardarProducto = exports.getProductos = exports.getProducto = exports.schema = exports.prods = void 0;
var buildSchema = require("graphql").buildSchema;
var logger_js_1 = require("../logger.js");
var productos_js_1 = __importDefault(require("../modelo/productos.js"));
exports.prods = new productos_js_1.default();
// GraphQL Schema
exports.schema = buildSchema("\n  type Query {\n    producto(id:ID!): Producto,\n    productos(filtro:String, valorDesde:String, valorHasta:String): [Producto],\n  },\n  type Mutation {\n    guardarProducto(code: String!, title: String!, description: String!, price: Int!, thumbnail: String!, stock: Int!): Producto\n  },\n  type Producto {\n    id: ID,\n    code: String,\n    title: String,\n    description: String,\n    price: Int,\n    thumbnail: String,\n    stock: Int\n  }\n");
var getProducto = function (_a) {
    var id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var producto, p, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.prods.buscarProducto(id)];
                case 1:
                    producto = _b.sent();
                    logger_js_1.consoleLogger.info("producto graphql " + JSON.stringify(producto));
                    p = producto[0];
                    delete p.timestamp;
                    return [2 /*return*/, p];
                case 2:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getProducto = getProducto;
var getProductos = function (filtro, valorDesde, valorHasta) { return __awaiter(void 0, void 0, void 0, function () {
    var productos, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.prods.listarProductos(filtro, valorDesde, valorHasta)];
            case 1:
                productos = _a.sent();
                return [2 /*return*/, productos];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductos = getProductos;
var guardarProducto = function (_a) {
    var code = _a.code, title = _a.title, description = _a.description, price = _a.price, thumbnail = _a.thumbnail, stock = _a.stock;
    return __awaiter(void 0, void 0, void 0, function () {
        var prod, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.prods.agregarProducto(code, title, description, price, thumbnail, stock)];
                case 1:
                    prod = _b.sent();
                    logger_js_1.consoleLogger.info("producto guardado " + JSON.stringify(prod));
                    if (prod) {
                        return [2 /*return*/, prod];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _b.sent();
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, []];
            }
        });
    });
};
exports.guardarProducto = guardarProducto;
exports.root = {
    producto: exports.getProducto,
    productos: exports.getProductos,
    guardarProducto: exports.guardarProducto,
};
