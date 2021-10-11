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
var knexMariaDB = (0, knex_1.default)(mariaDB_1.default);
var MariaDBDao = /** @class */ (function () {
    function MariaDBDao() {
        knexMariaDB.schema.hasTable("productos")
            .then(function (response) {
            console.log("respuesta al create table productos", response);
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
                    .then(function () { return console.log("tabla productos creada en mariaDB"); })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
        knexMariaDB.schema.hasTable("mensajes")
            .then(function (res) {
            console.log("respuesta al create table mensajes", res);
            if (!res) {
                knexMariaDB.schema.createTable("mensajes", function (table) {
                    table.string("author");
                    table.string("fecha");
                    table.string("text");
                })
                    .then(function () { return console.log("tabla mensajes creada en mariaDB"); })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
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
                        console.log('agregar por mariaDB');
                        return [4 /*yield*/, knexMariaDB("productos").insert(producto)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        response = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    MariaDBDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('buscar por mariaDB');
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .select("*")
                                .where("id", "=", parseInt(id))];
                    case 1:
                        producto = _a.sent();
                        console.log("productos encontrados", producto);
                        return [2 /*return*/, producto];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
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
                        console.log("listar productos por mariaDB");
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .select("*")];
                    case 1:
                        rows = _a.sent();
                        console.log("productos encontrados", rows);
                        return [2 /*return*/, rows];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MariaDBDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, knexMariaDB.from("productos")
                                .where("id", "=", parseInt(id))
                                .del()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        response = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    MariaDBDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, knexMariaDB.from("productos").where("id", "=", parseInt(id))
                                .update(producto)];
                    case 2:
                        response_1 = _a.sent();
                        console.log("producto actualizado", response_1);
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        response = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
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
                        console.log("mensajes encontrados", rows);
                        return [2 /*return*/, rows];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
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
                        console.log('agregar mensaje por mariaDB');
                        return [4 /*yield*/, knexMariaDB("mensajes").insert(mensaje)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        response = false;
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
