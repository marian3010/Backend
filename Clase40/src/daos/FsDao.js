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
var fs_1 = __importDefault(require("fs"));
var logger_js_1 = require("../../logger.js");
var fileProductos = "./data/productos.txt";
var fileMensajes = "./data/mensajes.txt";
var fileCarrito = "./data/carritos.txt";
var FsDao = /** @class */ (function () {
    function FsDao() {
        this.nuevoCartId = 1;
        this.carrito = {
            id: this.nuevoCartId,
            timestamp: Date.now(),
            productos: [],
        };
        if (typeof FsDao.instance === 'object') {
            logger_js_1.consoleLogger.warn("ya existe el objeto");
            return FsDao.instance;
        }
        FsDao.instance = this;
    }
    FsDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, productos, _a, _b, error_1, nuevoId, prod;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = true;
                        productos = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        productos = _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        logger_js_1.errorLogger.error(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        nuevoId = 1;
                        if (productos.length !== 0) {
                            nuevoId = productos[productos.length - 1].id + 1;
                        }
                        prod = {
                            code: producto.code,
                            title: producto.title,
                            description: producto.description,
                            price: producto.price,
                            thumbnail: producto.thumbnail,
                            stock: producto.stock,
                            timestamp: producto.timestamp,
                            id: nuevoId
                        };
                        logger_js_1.consoleLogger.info("prod a guardar " + JSON.stringify(prod));
                        productos.push(prod);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8")];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var respuesta, productos, _a, _b, i, prod, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        respuesta = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info('buscar prod en fs');
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        productos = _b.apply(_a, [_c.sent()]);
                        for (i = 0; i < productos.length; i++) {
                            if (productos[i].id == parseInt(id)) {
                                prod = productos[i];
                                respuesta.push(prod);
                                return [2 /*return*/, respuesta];
                            }
                            ;
                        }
                        ;
                        logger_js_1.consoleLogger.info("no encontro el producto");
                        return [2 /*return*/, false];
                    case 3:
                        error_2 = _c.sent();
                        logger_js_1.errorLogger.error(error_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productos, prods, _a, _b, _i, prods_1, row, producto, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        productos = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info("listar productos desde productos.txt");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        prods = _b.apply(_a, [_c.sent()]);
                        logger_js_1.consoleLogger.info("productos encontrados " + prods);
                        for (_i = 0, prods_1 = prods; _i < prods_1.length; _i++) {
                            row = prods_1[_i];
                            producto = {
                                code: row.code,
                                title: row.title,
                                description: row.description,
                                price: row.price,
                                thumbnail: row.thumbnail,
                                stock: row.stock,
                                timestamp: row.timestamp,
                                id: row.id
                            };
                            productos.push(producto);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        logger_js_1.errorLogger.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, productos];
                }
            });
        });
    };
    ;
    FsDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, productos, _a, _b, i, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        productos = _b.apply(_a, [_c.sent()]);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < productos.length)) return [3 /*break*/, 7];
                        if (!(productos[i].id == id)) return [3 /*break*/, 5];
                        productos.splice(i, 1);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8")];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        ;
                        _c.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        ;
                        return [3 /*break*/, 9];
                    case 8:
                        error_4 = _c.sent();
                        logger_js_1.errorLogger.error(error_4);
                        response = false;
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, productos, _a, _b, i, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        productos = _b.apply(_a, [_c.sent()]);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < productos.length)) return [3 /*break*/, 7];
                        if (!(productos[i].id == id)) return [3 /*break*/, 5];
                        productos[i].code = producto.code;
                        productos[i].title = producto.title;
                        productos[i].description = producto.description;
                        productos[i].price = producto.price;
                        productos[i].thumbnail = producto.thumbnail;
                        productos[i].stock = producto.stock;
                        productos[i].timestamp = producto.timestamp;
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(productos, null, "\t"), "utf-8")];
                    case 4:
                        _c.sent();
                        response = true;
                        _c.label = 5;
                    case 5:
                        ;
                        _c.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        ;
                        return [3 /*break*/, 9];
                    case 8:
                        error_5 = _c.sent();
                        logger_js_1.errorLogger.error(error_5);
                        response = false;
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.leerMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mensajesArray, _a, _b, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mensajesArray = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info("listar mensajes desde mensajes.txt");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileMensajes, "utf-8")];
                    case 2:
                        mensajesArray = _b.apply(_a, [_c.sent()]);
                        logger_js_1.consoleLogger.info("mensajes encontrados " + mensajesArray);
                        return [2 /*return*/, mensajesArray];
                    case 3:
                        error_6 = _c.sent();
                        logger_js_1.errorLogger.error(error_6);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var response, mensajesArray, _a, _b, nuevoId, message, error_7, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileMensajes, "utf-8")];
                    case 2:
                        mensajesArray = _b.apply(_a, [_c.sent()]);
                        nuevoId = 1;
                        if (mensajesArray.length !== 0) {
                            nuevoId = mensajesArray[mensajesArray.length - 1].id + 1;
                        }
                        message = {
                            author: mensaje.author,
                            fecha: mensaje.fecha,
                            text: mensaje.text
                        };
                        logger_js_1.consoleLogger.info("mensaje a guardar " + message);
                        mensajesArray.push(message);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileMensajes, JSON.stringify(mensajesArray, null, "\t"), "utf-8")];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _c.sent();
                        logger_js_1.errorLogger.error(error_7);
                        response = false;
                        return [3 /*break*/, 6];
                    case 6:
                        ;
                        return [3 /*break*/, 8];
                    case 7:
                        error_8 = _c.sent();
                        logger_js_1.errorLogger.error(error_8);
                        response = false;
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.agregarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, i, error_9, productos, _d, _e, error_10, i, prod;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        response = true;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileCarrito, "utf-8")];
                    case 2:
                        _a.carrito = _c.apply(_b, [_f.sent()]);
                        // recorro los productos del carrito para ver si el producto a agregar ya existe en el carrito
                        if (this.carrito.productos.length > 0) {
                            for (i = 0; i < this.carrito.productos.length; i++) {
                                if (this.carrito.productos[i].id == id) {
                                    logger_js_1.consoleLogger.info("el producto ya existe en el carrito");
                                    response = false;
                                    return [2 /*return*/, response];
                                }
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _f.sent();
                        logger_js_1.errorLogger.error(error_9);
                        return [3 /*break*/, 4];
                    case 4:
                        productos = [];
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, 7, , 8]);
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 6:
                        productos = _e.apply(_d, [_f.sent()]);
                        return [3 /*break*/, 8];
                    case 7:
                        error_10 = _f.sent();
                        logger_js_1.errorLogger.error(error_10);
                        return [3 /*break*/, 8];
                    case 8:
                        i = 0;
                        _f.label = 9;
                    case 9:
                        if (!(i < productos.length)) return [3 /*break*/, 13];
                        if (!(productos[i].id == id)) return [3 /*break*/, 11];
                        prod = {
                            code: productos[i].code,
                            title: productos[i].title,
                            description: productos[i].description,
                            price: productos[i].price,
                            thumbnail: productos[i].thumbnail,
                            stock: productos[i].stock,
                            timestamp: productos[i].timestamp,
                            id: productos[i].id
                        };
                        this.carrito.productos.push(prod);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileCarrito, JSON.stringify(this.carrito, null, "\t"), "utf-8")];
                    case 10:
                        _f.sent();
                        logger_js_1.consoleLogger.info("producto agregado al carrito " + prod);
                        return [2 /*return*/, response];
                    case 11:
                        ;
                        _f.label = 12;
                    case 12:
                        i++;
                        return [3 /*break*/, 9];
                    case 13:
                        ;
                        response = false;
                        logger_js_1.consoleLogger.warn("producto no encontrado");
                        logger_js_1.warningLogger.warn("producto no encontrado");
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.buscarProdCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var carrito, _a, _b, listaProductos, producto, _i, listaProductos_1, prod;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileCarrito, "utf-8")];
                    case 1:
                        carrito = _b.apply(_a, [_c.sent()]);
                        listaProductos = carrito.productos;
                        producto = [];
                        for (_i = 0, listaProductos_1 = listaProductos; _i < listaProductos_1.length; _i++) {
                            prod = listaProductos_1[_i];
                            if (prod.id === parseInt(id)) {
                                producto.push(prod);
                            }
                        }
                        return [2 /*return*/, (producto)];
                }
            });
        });
    };
    ;
    FsDao.prototype.listarProdsCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carrito, _a, _b, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        carrito = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info("listar productos del carrito desde carrito.txt");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileCarrito, "utf-8")];
                    case 2:
                        carrito = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, carrito.productos];
                    case 3:
                        error_11 = _c.sent();
                        logger_js_1.errorLogger.error(error_11);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.borrarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, carrito, _a, _b, i, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileCarrito, "utf-8")];
                    case 2:
                        carrito = _b.apply(_a, [_c.sent()]);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < carrito.productos.length)) return [3 /*break*/, 7];
                        if (!(carrito.productos[i].id == parseInt(id))) return [3 /*break*/, 5];
                        carrito.productos.splice(i, 1);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileCarrito, JSON.stringify(carrito, null, "\t"), "utf-8")];
                    case 4:
                        _c.sent();
                        response = true;
                        _c.label = 5;
                    case 5:
                        ;
                        _c.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        ;
                        return [3 /*break*/, 9];
                    case 8:
                        error_12 = _c.sent();
                        logger_js_1.errorLogger.error(error_12);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    return FsDao;
}());
;
exports.default = FsDao;
