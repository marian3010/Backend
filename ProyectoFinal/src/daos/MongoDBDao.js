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
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../../server");
var logger_js_1 = require("../../logger.js");
var mongoose = require("mongoose");
var prodModel = require("../../model/prods");
var modelMensajes = require("../../model/messages.js");
var cartModel = require("../../model/cart");
var cartProdModel = require("../../model/cartProd");
var orderModel = require("../../model/order");
var orderProdModel = require("../../model/orderProd");
var connectStrLocal = "mongodb://localhost:27017/ecommerce";
var config = require("../../config");
function connectMongoose(connect) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_js_1.consoleLogger.info("conexión a mongoLocal");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongoose.connect(connect)];
                case 2:
                    _a.sent();
                    logger_js_1.consoleLogger.info("Base de datos conectada");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger_js_1.errorLogger.error(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
function connectMongooseAtlas() {
    return __awaiter(this, void 0, void 0, function () {
        var dbname, password, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_js_1.consoleLogger.info("conexión a mongoAtlas");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    dbname = config.MONGO_DBNAME;
                    password = config.MONGO_PASS;
                    user = config.MONGO_USER;
                    return [4 /*yield*/, mongoose.connect("mongodb+srv://" + user + ":" + password + "@cluster0.jbzno.mongodb.net/" + dbname + "?retryWrites=true&w=majority")];
                case 2:
                    _a.sent();
                    logger_js_1.consoleLogger.info("Base de datos conectada");
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    logger_js_1.errorLogger.error(error_2);
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
var MongoDBDao = /** @class */ (function () {
    function MongoDBDao() {
        if (typeof MongoDBDao.instance === 'object') {
            logger_js_1.consoleLogger.warn("ya existe el objeto");
            return MongoDBDao.instance;
        }
        ;
        MongoDBDao.instance = this;
    }
    ;
    MongoDBDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('agregar producto por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("agregar producto por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        producto.timestamp = Date.now();
                        return [4 /*yield*/, prodModel.default.insertMany(producto)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_3 = _a.sent();
                        logger_js_1.errorLogger.error(error_3);
                        resultado = false;
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        producto = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('buscar producto por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info('buscar producto por mongoAtlas');
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, prodModel.default.find({ _id: id }, { _id: 1, code: 1, title: 1, description: 1, price: 1, thumbnail: 1, stock: 1, timestamp: 1 })];
                    case 6:
                        producto = _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_4 = _a.sent();
                        logger_js_1.errorLogger.error(error_4);
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, producto];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('listar productos por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("listar productos por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, prodModel.default.find()];
                    case 6:
                        productosArray = _a.sent();
                        logger_js_1.consoleLogger.info("productos encontrados " + productosArray);
                        return [3 /*break*/, 9];
                    case 7:
                        error_5 = _a.sent();
                        logger_js_1.errorLogger.error(error_5);
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, productosArray];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, resp, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('borrar producto por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("borrar producto por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, prodModel.default.deleteMany({ _id: id })];
                    case 6:
                        resp = _a.sent();
                        logger_js_1.consoleLogger.info("producto borrado  " + resp.deletedCount);
                        if (resp.deletedCount == 1) {
                            resultado = true;
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        error_6 = _a.sent();
                        logger_js_1.errorLogger.error(error_6);
                        resultado = false;
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, resp, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('actualizar producto por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("actualizar producto por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, prodModel.default.findByIdAndUpdate(id, producto)];
                    case 6:
                        resp = _a.sent();
                        logger_js_1.consoleLogger.info("producto actualizado " + resp);
                        if (resp) {
                            resultado = true;
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        error_7 = _a.sent();
                        logger_js_1.errorLogger.error(error_7);
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.leerMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mensajesArray, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mensajesArray = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('listar mensajes por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("listar mensajes por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, modelMensajes.default.find()];
                    case 6:
                        mensajesArray = _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_8 = _a.sent();
                        logger_js_1.errorLogger.error(error_8);
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, mensajesArray];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('listar mensajes por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("listar mensajes por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        logger_js_1.consoleLogger.info("mensaje a insertar en Mongodb " + mensaje);
                        return [4 /*yield*/, modelMensajes.default.insertMany(mensaje)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_9 = _a.sent();
                        logger_js_1.errorLogger.error(error_9);
                        resultado = false;
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.agregarProdsCarrito = function (id, cant) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, prodAgregar, carritoID, prodExist, producto, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, 16, 17]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('agregar producto en carrito por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("agregar producto en carrito por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, prodModel.default.find({ _id: id }, { _id: 1 })];
                    case 6:
                        prodAgregar = _a.sent();
                        if (!(prodAgregar.length > 0)) return [3 /*break*/, 14];
                        return [4 /*yield*/, cartModel.default.find({}, { _id: 1 })];
                    case 7:
                        carritoID = _a.sent();
                        if (!(carritoID.length == 0)) return [3 /*break*/, 10];
                        logger_js_1.consoleLogger.info("no encontró carrito, va a crear uno");
                        return [4 /*yield*/, cartModel.default.insertMany({ timestamp: Date.now() })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, cartModel.default.find({}, { _id: 1 })];
                    case 9:
                        carritoID = _a.sent();
                        return [3 /*break*/, 14];
                    case 10: return [4 /*yield*/, cartProdModel.default.find({ idProd: id })];
                    case 11:
                        prodExist = _a.sent();
                        if (!(prodExist.length > 0)) return [3 /*break*/, 12];
                        logger_js_1.consoleLogger.info("el producto ya existe en el carrito");
                        return [3 /*break*/, 14];
                    case 12:
                        carritoID = JSON.parse(JSON.stringify(carritoID));
                        producto = {
                            idCart: carritoID[0]._id,
                            idProd: id,
                            cantProd: cant
                        };
                        return [4 /*yield*/, cartProdModel.default.insertMany(producto)];
                    case 13:
                        result = _a.sent();
                        if (result) {
                            resultado = true;
                        }
                        _a.label = 14;
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        error_10 = _a.sent();
                        logger_js_1.errorLogger.error(error_10);
                        return [3 /*break*/, 17];
                    case 16:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 17:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.buscarProdCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var lista, prodID, cantProd, regProd, producto, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lista = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, 12, 13]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('buscar producto por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("buscar producto por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, cartProdModel.default.find({ idProd: id }, { _id: 1 })];
                    case 6:
                        prodID = _a.sent();
                        if (!(prodID.length == 0)) return [3 /*break*/, 7];
                        logger_js_1.consoleLogger.warn("el producto no está en el carrito");
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, cartProdModel.default.find({ idProd: id }, { cantProd: 1 })];
                    case 8:
                        cantProd = _a.sent();
                        cantProd = cantProd[0].cantProd;
                        return [4 /*yield*/, prodModel.default.find({ _id: id }, { _id: 1, code: 1, title: 1, description: 1, price: 1, thumbnail: 1, stock: 1, timestamp: 1 })];
                    case 9:
                        regProd = _a.sent();
                        producto = {
                            _id: regProd[0]._id,
                            code: regProd[0].code,
                            title: regProd[0].title,
                            description: regProd[0].description,
                            price: regProd[0].price,
                            thumbnail: regProd[0].thumbnail,
                            stock: regProd[0].stock,
                            timestamp: regProd[0].timestamp,
                            cantidad: cantProd
                        };
                        lista.push(producto);
                        _a.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        error_11 = _a.sent();
                        logger_js_1.errorLogger.error(error_11);
                        return [3 /*break*/, 13];
                    case 12:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, lista];
                    case 13:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.listarProdsCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, rows, _i, rows_1, row, cantProd, regProd, producto, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, 13, 14]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('listar productos por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("listar productos por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, cartProdModel.default.find({}, { idProd: 1 })];
                    case 6:
                        rows = _a.sent();
                        _i = 0, rows_1 = rows;
                        _a.label = 7;
                    case 7:
                        if (!(_i < rows_1.length)) return [3 /*break*/, 11];
                        row = rows_1[_i];
                        return [4 /*yield*/, cartProdModel.default.find({ idProd: row.idProd }, { cantProd: 1 })];
                    case 8:
                        cantProd = _a.sent();
                        cantProd = cantProd[0].cantProd;
                        return [4 /*yield*/, prodModel.default.find({ _id: row.idProd })];
                    case 9:
                        regProd = _a.sent();
                        producto = {
                            _id: regProd[0]._id,
                            code: regProd[0].code,
                            title: regProd[0].title,
                            description: regProd[0].description,
                            price: regProd[0].price,
                            thumbnail: regProd[0].thumbnail,
                            stock: regProd[0].stock,
                            timestamp: regProd[0].timestamp,
                            cantidad: cantProd
                        };
                        productosArray.push(producto);
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 7];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        error_12 = _a.sent();
                        logger_js_1.errorLogger.error(error_12);
                        return [3 /*break*/, 14];
                    case 13:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, productosArray];
                    case 14:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.borrarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, resp, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 3];
                        logger_js_1.consoleLogger.info('borrar producto del carrito por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        logger_js_1.consoleLogger.info("borrar producto del carrito por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, cartProdModel.default.deleteMany({ idProd: id })];
                    case 6:
                        resp = _a.sent();
                        logger_js_1.consoleLogger.info("producto borrado " + resp.deletedCount);
                        if (resp.deletedCount == 1) {
                            resultado = true;
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        error_13 = _a.sent();
                        logger_js_1.errorLogger.error(error_13);
                        return [3 /*break*/, 9];
                    case 8:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, resultado];
                    case 9:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MongoDBDao.prototype.generarOrden = function (userMail, prodList) {
        return __awaiter(this, void 0, void 0, function () {
            var ordenID, ordenNro, timestamp, status_1, emailBuyer, orden, _i, prodList_1, row, ordenProd, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, 13, 14]);
                        if (!(server_1.opcionCapa == 4)) return [3 /*break*/, 2];
                        logger_js_1.consoleLogger.info('generar orden por mongoDB');
                        return [4 /*yield*/, connectMongoose(connectStrLocal)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        logger_js_1.consoleLogger.info("generar orden por mongoAtlas");
                        return [4 /*yield*/, connectMongooseAtlas()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, orderModel.default.count()];
                    case 5:
                        ordenNro = (_a.sent()) + 1;
                        timestamp = Date.now();
                        status_1 = "generada";
                        emailBuyer = userMail;
                        orden = {
                            timestamp: timestamp,
                            status: status_1,
                            emailBuyer: emailBuyer,
                            orderNum: ordenNro
                        };
                        return [4 /*yield*/, orderModel.default.insertMany(orden)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, orderModel.default.find({ "orderNum": ordenNro }, { _id: 1 })];
                    case 7:
                        ordenID = _a.sent();
                        ordenID = JSON.parse(JSON.stringify(ordenID));
                        ordenID = ordenID[0]._id;
                        _i = 0, prodList_1 = prodList;
                        _a.label = 8;
                    case 8:
                        if (!(_i < prodList_1.length)) return [3 /*break*/, 11];
                        row = prodList_1[_i];
                        ordenProd = {
                            idOrder: ordenID,
                            idProd: row.idProducto,
                            cantProd: row.cantidad,
                            priceProd: row.precioUnitario,
                            totalProd: row.precioTotal
                        };
                        return [4 /*yield*/, orderProdModel.default.insertMany(ordenProd)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        error_14 = _a.sent();
                        logger_js_1.errorLogger.error(error_14);
                        return [3 /*break*/, 14];
                    case 13:
                        mongoose.disconnect().then(function () {
                            logger_js_1.consoleLogger.info("Base de datos desconectada");
                        });
                        return [2 /*return*/, ordenNro];
                    case 14:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return MongoDBDao;
}());
;
exports.default = MongoDBDao;
