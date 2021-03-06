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
var mariaDB_1 = __importDefault(require("../../db/mariaDB"));
var knex_1 = __importDefault(require("knex"));
var logger_js_1 = require("../../logger.js");
var knexMariaDB = (0, knex_1.default)(mariaDB_1.default);
var server_1 = require("../../server");
if (server_1.opcionCapa === 2) {
    knexMariaDB.schema.hasTable("productos")
        .then(function (response) {
        logger_js_1.consoleLogger.info("respuesta al create table productos " + response);
        if (!response) {
            knexMariaDB.schema.createTable("productos", function (table) {
                table.increments("id", { primaryKey: true });
                table.string("code");
                table.string("title").notNullable();
                table.string("description");
                table.integer("price").notNullable();
                table.string("thumbnail");
                table.integer("stock");
                table.integer("timestamp");
            })
                .then(function () { return logger_js_1.consoleLogger.info("tabla productos creada en mariaDB"); })
                .catch(function (error) {
                logger_js_1.errorLogger.error(error);
            });
        }
    });
    knexMariaDB.schema.hasTable("mensajes")
        .then(function (res) {
        logger_js_1.consoleLogger.info("respuesta al create table mensajes " + res);
        if (!res) {
            knexMariaDB.schema.createTable("mensajes", function (table) {
                table.string("author");
                table.string("fecha");
                table.string("text");
            })
                .then(function () { return logger_js_1.consoleLogger.info("tabla mensajes creada en mariaDB"); })
                .catch(function (error) {
                logger_js_1.errorLogger.error(error);
            });
        }
    });
    knexMariaDB.schema.hasTable("carrito")
        .then(function (resp) {
        logger_js_1.consoleLogger.info("respuesta al create table carrito " + resp);
        if (!resp) {
            knexMariaDB.schema.createTable("carrito", function (table) {
                table.increments("id", { primaryKey: true });
                table.integer("timestamp");
            })
                .then(function () { return logger_js_1.consoleLogger.info("tabla carrito creada en mariaDB"); })
                .catch(function (error) {
                logger_js_1.errorLogger.error(error);
            });
        }
    });
    knexMariaDB.schema.hasTable("productosCarrito")
        .then(function (respo) {
        logger_js_1.consoleLogger.info("respuesta al create table productosCarrito " + respo);
        if (!respo) {
            knexMariaDB.schema.createTable("productosCarrito", function (table) {
                table.increments("id", { primaryKey: true });
                table.integer('idCarrito').notNullable();
                table.integer('idProducto').notNullable();
            })
                .then(function () { return logger_js_1.consoleLogger.info("tabla productosCarrito creada en mariaDB"); })
                .catch(function (error) {
                logger_js_1.errorLogger.error(error);
            });
        }
    });
}
;
var MariaDBDao = /** @class */ (function () {
    function MariaDBDao() {
        if (typeof MariaDBDao.instance === 'object') {
            logger_js_1.consoleLogger.warn("ya existe el objeto");
            return MariaDBDao.instance;
        }
        MariaDBDao.instance = this;
    }
    MariaDBDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info('agregar por mariaDB');
                        return [4 /*yield*/, knexMariaDB("productos").insert(producto)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        logger_js_1.errorLogger.error(error_1);
                        response = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    MariaDBDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prod, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_js_1.consoleLogger.info('buscar por mariaDB');
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .select("*")
                                .where("id", "=", parseInt(id))];
                    case 1:
                        prod = _a.sent();
                        logger_js_1.consoleLogger.info("productos encontrados " + prod);
                        return [2 /*return*/, prod];
                    case 2:
                        error_2 = _a.sent();
                        logger_js_1.errorLogger.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MariaDBDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_js_1.consoleLogger.info("listar productos por mariaDB");
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .select("*")];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 2:
                        error_3 = _a.sent();
                        logger_js_1.errorLogger.error(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MariaDBDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, resul, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .where("id", "=", parseInt(id))
                                .del()];
                    case 2:
                        resul = _a.sent();
                        if (resul) {
                            response = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        logger_js_1.errorLogger.error(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    MariaDBDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, knexMariaDB.from("productos").where("id", "=", parseInt(id))
                                .update(producto)];
                    case 2:
                        response = _a.sent();
                        logger_js_1.consoleLogger.info("producto actualizado " + response);
                        if (response) {
                            resultado = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        logger_js_1.errorLogger.error(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, resultado];
                }
            });
        });
    };
    MariaDBDao.prototype.leerMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knexMariaDB.from("mensajes")
                                .select("*")];
                    case 1:
                        rows = _a.sent();
                        logger_js_1.consoleLogger.info("mensajes encontrados " + rows);
                        return [2 /*return*/, rows];
                    case 2:
                        error_6 = _a.sent();
                        logger_js_1.errorLogger.error(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MariaDBDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        logger_js_1.consoleLogger.info('agregar mensaje por mariaDB');
                        return [4 /*yield*/, knexMariaDB("mensajes").insert(mensaje)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        logger_js_1.errorLogger.error(error_7);
                        response = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    MariaDBDao.prototype.agregarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, prodAgregar, prodCart, carritoID, prods, _i, prods_1, prod, producto, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, knexMariaDB("productos").select("id").where("id", "=", parseInt(id))];
                    case 2:
                        prodAgregar = _a.sent();
                        if (prodAgregar.length == 0) {
                            logger_js_1.consoleLogger.info("producto no encontrado");
                            response = false;
                            return [2 /*return*/, response];
                        }
                        return [4 /*yield*/, knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id))];
                    case 3:
                        prodCart = _a.sent();
                        if (prodCart.length > 0) {
                            logger_js_1.consoleLogger.info("el producto ingresado ya existe en el carrito");
                            response = false;
                            return [2 /*return*/, response];
                        }
                        return [4 /*yield*/, knexMariaDB("carrito").select("id")];
                    case 4:
                        carritoID = _a.sent();
                        if (!(carritoID.length == 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, knexMariaDB("carrito").insert({ timestamp: Date.now() }).returning('id')];
                    case 5:
                        carritoID = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        prods = JSON.parse(JSON.stringify(carritoID));
                        for (_i = 0, prods_1 = prods; _i < prods_1.length; _i++) {
                            prod = prods_1[_i];
                            carritoID = prod.id;
                        }
                        _a.label = 7;
                    case 7:
                        producto = {
                            idCarrito: carritoID,
                            idProducto: id
                        };
                        return [4 /*yield*/, knexMariaDB("productosCarrito").insert(producto)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_8 = _a.sent();
                        logger_js_1.errorLogger.error(error_8);
                        response = false;
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    MariaDBDao.prototype.buscarProdCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, productoCart, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        producto = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id))];
                    case 2:
                        productoCart = _a.sent();
                        if (productoCart.length == 0) {
                            logger_js_1.consoleLogger.warn("el producto no est?? en el carrito");
                            return [2 /*return*/, producto];
                        }
                        return [4 /*yield*/, knexMariaDB("productos").select("*").where("id", "=", parseInt(id))];
                    case 3:
                        producto = _a.sent();
                        logger_js_1.consoleLogger.info("id producto encontrado " + producto);
                        return [2 /*return*/, producto];
                    case 4:
                        error_9 = _a.sent();
                        logger_js_1.errorLogger.error(error_9);
                        return [2 /*return*/, producto];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    MariaDBDao.prototype.listarProdsCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, rows, results, productoInsert, _i, results_1, row, prods, _a, prods_2, prod, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productosArray = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        logger_js_1.consoleLogger.info("listar productos carrito por mariaDB");
                        return [4 /*yield*/, knexMariaDB("productosCarrito").select("*")];
                    case 2:
                        rows = _b.sent();
                        results = JSON.parse(JSON.stringify(rows));
                        productoInsert = void 0;
                        _i = 0, results_1 = results;
                        _b.label = 3;
                    case 3:
                        if (!(_i < results_1.length)) return [3 /*break*/, 6];
                        row = results_1[_i];
                        return [4 /*yield*/, knexMariaDB("productos").select("*").where("id", "=", row.idProducto)];
                    case 4:
                        prods = _b.sent();
                        prods = JSON.parse(JSON.stringify(prods));
                        for (_a = 0, prods_2 = prods; _a < prods_2.length; _a++) {
                            prod = prods_2[_a];
                            productoInsert = {
                                id: prod.id,
                                code: prod.code,
                                title: prod.title,
                                description: prod.description,
                                price: prod.price,
                                thumbnail: prod.thumbnail,
                                stock: prod.stock,
                                timestamp: prod.timestamp
                            };
                        }
                        productosArray.push(productoInsert);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_10 = _b.sent();
                        logger_js_1.errorLogger.error(error_10);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, productosArray];
                }
            });
        });
    };
    ;
    MariaDBDao.prototype.borrarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, resp, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, knexMariaDB.from("productosCarrito")
                                .where("idProducto", "=", parseInt(id))
                                .del()];
                    case 2:
                        resp = _a.sent();
                        logger_js_1.consoleLogger.info("respuesta de borrar producto del carrito " + resp);
                        if (resp) {
                            response = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _a.sent();
                        logger_js_1.errorLogger.error(error_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    return MariaDBDao;
}());
exports.default = MariaDBDao;
