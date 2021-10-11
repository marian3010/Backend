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
var fileProductos = "./data/productos.txt";
var fileMensajes = "./data/mensajes.txt";
var FsDao = /** @class */ (function () {
    function FsDao() {
        this.nuevoId = 0;
        this.archivo = {
            productos: [],
        };
    }
    FsDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, error_1, prod, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        response = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        _a.archivo = _c.apply(_b, [_d.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.nuevoId++;
                        prod = {
                            code: producto.code,
                            title: producto.title,
                            description: producto.description,
                            price: producto.price,
                            thumbnail: producto.thumbnail,
                            stock: producto.stock,
                            timestamp: producto.timestamp,
                            id: this.nuevoId
                        };
                        console.log("prod a guardar", prod);
                        this.archivo.productos.push(prod);
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8")];
                    case 6:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _d.sent();
                        console.log(error_2);
                        response = false;
                        return [3 /*break*/, 8];
                    case 8:
                        ;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    FsDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, i, prod, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        console.log('buscar prod en fs');
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 1:
                        _a.archivo = _c.apply(_b, [_d.sent()]);
                        for (i = 0; i < this.archivo.productos.length; i++) {
                            if (this.archivo.productos[i].id == id) {
                                prod = this.archivo.productos[i];
                                console.log("devuelve prod encontrado", prod);
                                return [2 /*return*/, prod];
                            }
                            ;
                        }
                        ;
                        console.log("no encontro el producto");
                        return [2 /*return*/, false];
                    case 2:
                        error_3 = _d.sent();
                        console.log(error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        console.log("listar productos desde productos.txt");
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 1:
                        _a.archivo = _c.apply(_b, [_d.sent()]);
                        console.log("productos encontrados", this.archivo.productos);
                        return [2 /*return*/, this.archivo.productos];
                    case 2:
                        error_4 = _d.sent();
                        console.log(error_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, i, error_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        response = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, , 9]);
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        _a.archivo = _c.apply(_b, [_d.sent()]);
                        i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(i < this.archivo.productos.length)) return [3 /*break*/, 7];
                        if (!(this.archivo.productos[i].id == id)) return [3 /*break*/, 5];
                        this.archivo.productos.splice(i, 1);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8")];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        ;
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        ;
                        return [3 /*break*/, 9];
                    case 8:
                        error_5 = _d.sent();
                        console.log(error_5);
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
            var response, _a, _b, _c, i, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        response = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, , 9]);
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileProductos, "utf-8")];
                    case 2:
                        _a.archivo = _c.apply(_b, [_d.sent()]);
                        i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(i < this.archivo.productos.length)) return [3 /*break*/, 7];
                        if (!(this.archivo.productos[i].id == id)) return [3 /*break*/, 5];
                        this.archivo.productos[i].code = producto.code;
                        this.archivo.productos[i].title = producto.title;
                        this.archivo.productos[i].description = producto.description;
                        this.archivo.productos[i].price = producto.price;
                        this.archivo.productos[i].thumbnail = producto.thumbnail;
                        this.archivo.productos[i].stock = producto.stock;
                        this.archivo.productos[i].timestamp = producto.timestamp;
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileProductos, JSON.stringify(this.archivo, null, "\t"), "utf-8")];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        ;
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        ;
                        return [3 /*break*/, 9];
                    case 8:
                        error_6 = _d.sent();
                        console.log(error_6);
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
            var mensajesArray, _a, _b, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mensajesArray = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        console.log("listar mensajes desde mensajes.txt");
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileMensajes, "utf-8")];
                    case 2:
                        mensajesArray = _b.apply(_a, [_c.sent()]);
                        console.log("mensajes encontrados", mensajesArray);
                        return [2 /*return*/, mensajesArray];
                    case 3:
                        error_7 = _c.sent();
                        console.log(error_7);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FsDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var response, mensajesArray, _a, _b, error_8, message, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = true;
                        mensajesArray = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs_1.default.promises.readFile(fileMensajes, "utf-8")];
                    case 2:
                        mensajesArray = _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _c.sent();
                        console.log(error_8);
                        return [3 /*break*/, 4];
                    case 4:
                        this.nuevoId++;
                        message = {
                            author: mensaje.author,
                            fecha: mensaje.fecha,
                            text: mensaje.text
                        };
                        console.log("mensaje a guardar", message);
                        mensajesArray.push(message);
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(fileMensajes, JSON.stringify(mensajesArray, null, "\t"), "utf-8")];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_9 = _c.sent();
                        console.log(error_9);
                        response = false;
                        return [3 /*break*/, 8];
                    case 8:
                        ;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    return FsDao;
}());
exports.default = FsDao;
