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
var DaoFactory_1 = __importDefault(require("../src/DaoFactory"));
var server_1 = require("../server");
var logger_js_1 = require("../logger.js");
var daoFact = new DaoFactory_1.default(server_1.opcionCapa);
var dao = daoFact.elegirBD();
logger_js_1.consoleLogger.info("Dao", dao);
var Productos = /** @class */ (function () {
    function Productos() {
    }
    ;
    Productos.prototype.agregarProducto = function (code, title, description, price, thumbnail, stock, timestamp) {
        if (timestamp === void 0) { timestamp = Date.now(); }
        return __awaiter(this, void 0, void 0, function () {
            var producto, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        producto = {
                            code: code,
                            title: title,
                            description: description,
                            price: price,
                            thumbnail: thumbnail,
                            stock: stock,
                            timestamp: timestamp
                        };
                        logger_js_1.consoleLogger.info("producto que va como parametro al dao " + JSON.stringify(producto));
                        return [4 /*yield*/, dao.agregarProducto(producto)];
                    case 1:
                        response = _a.sent();
                        logger_js_1.consoleLogger.info("funci\u00F3n exitosa " + response);
                        return [2 /*return*/, producto];
                    case 2:
                        error_1 = _a.sent();
                        logger_js_1.errorLogger.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Productos.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productoEncontrado, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dao.buscarProducto(id)];
                    case 1:
                        productoEncontrado = _a.sent();
                        logger_js_1.consoleLogger.info("id del producto buscado " + id);
                        logger_js_1.consoleLogger.info("producto encontrado " + productoEncontrado);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        logger_js_1.errorLogger.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, productoEncontrado];
                }
            });
        });
    };
    ;
    Productos.prototype.listarProductos = function (filtro, valorDesde, valorHasta) {
        return __awaiter(this, void 0, void 0, function () {
            var listaProductos, rows, _i, rows_1, row, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listaProductos = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dao.listarProductos()];
                    case 2:
                        rows = _a.sent();
                        if (rows) {
                            for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                                row = rows_1[_i];
                                listaProductos.push({ code: row["code"], title: row["title"], description: row["description"], price: row["price"], thumbnail: row["thumbnail"], stock: row["stock"], timestamp: row["timestamp"], id: row["id"] });
                            }
                            ;
                        }
                        ;
                        logger_js_1.consoleLogger.info("lista productos " + listaProductos);
                        logger_js_1.consoleLogger.info("filtro " + filtro);
                        logger_js_1.consoleLogger.info("valor desde " + valorDesde);
                        logger_js_1.consoleLogger.info("valor hasta " + valorHasta);
                        if (!filtro) {
                            logger_js_1.consoleLogger.info("sin filtro");
                            logger_js_1.consoleLogger.info("lista productos " + listaProductos);
                            return [2 /*return*/, listaProductos];
                        }
                        if (filtro === 'nombre')
                            return [2 /*return*/, [listaProductos.find(function (producto) { return producto.title === valorDesde; })]];
                        if (filtro === 'codigo')
                            return [2 /*return*/, [listaProductos.find(function (producto) { return producto.code === valorDesde; })]];
                        if (filtro === 'precio')
                            return [2 /*return*/, listaProductos.filter(function (producto) { return producto.price > valorDesde && producto.price < valorHasta; })];
                        if (filtro === 'stock')
                            return [2 /*return*/, listaProductos.filter(function (producto) { return producto.stock > valorDesde && producto.stock < valorHasta; })];
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        logger_js_1.errorLogger.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, listaProductos];
                }
            });
        });
    };
    ;
    Productos.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dao.borrarProducto(id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_4 = _a.sent();
                        logger_js_1.errorLogger.error(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Productos.prototype.actualizarProducto = function (code, title, description, price, thumbnail, stock, id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        producto = {
                            code: code,
                            title: title,
                            description: description,
                            price: price,
                            thumbnail: thumbnail,
                            stock: stock,
                            timestamp: Date.now()
                        };
                        return [4 /*yield*/, dao.actualizarProducto(id, producto)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_5 = _a.sent();
                        logger_js_1.errorLogger.error(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return Productos;
}());
;
exports.default = Productos;
