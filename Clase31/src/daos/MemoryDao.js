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
var MemoryDao = /** @class */ (function () {
    function MemoryDao() {
        if (typeof MemoryDao.instance === 'object') {
            console.log("ya existe el objeto");
            return MemoryDao.instance;
        }
        MemoryDao.instance = this;
        this.nuevoCartId = 1;
        this.carrito = {
            id: this.nuevoCartId,
            timestamp: Date.now(),
            productos: [],
        };
        this.nuevoProdId = 0;
        this.productos = [];
        this.messages = [];
        this.messageNuevoId = 0;
    }
    MemoryDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, prod;
            return __generator(this, function (_a) {
                response = true;
                this.nuevoProdId++;
                prod = {
                    code: producto.code,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    stock: producto.stock,
                    timestamp: producto.timestamp,
                    id: this.nuevoProdId
                };
                this.productos.push(prod);
                return [2 /*return*/, response];
            });
        });
    };
    ;
    MemoryDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productos, i;
            return __generator(this, function (_a) {
                productos = [];
                for (i = 0; i < this.productos.length; i++) {
                    if (this.productos[i].id == id) {
                        console.log("producto encontrado", this.productos[i]);
                        productos.push(this.productos[i]);
                        return [2 /*return*/, productos];
                    }
                    ;
                }
                ;
                return [2 /*return*/, false];
            });
        });
    };
    ;
    MemoryDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("lista de productos en memoria", this.productos);
                return [2 /*return*/, this.productos];
            });
        });
    };
    ;
    MemoryDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                for (i = 0; i < this.productos.length; i++) {
                    if (this.productos[i].id == id) {
                        console.log("producto borrado", this.productos[i]);
                        this.productos.splice(i, 1);
                        return [2 /*return*/, true];
                    }
                    ;
                }
                ;
                return [2 /*return*/, false];
            });
        });
    };
    ;
    MemoryDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var response, i, prodActualizado;
            return __generator(this, function (_a) {
                response = false;
                for (i = 0; i < this.productos.length; i++) {
                    if (this.productos[i].id == id) {
                        this.productos[i].code = producto.code;
                        this.productos[i].title = producto.title;
                        this.productos[i].description = producto.description;
                        this.productos[i].price = producto.price;
                        this.productos[i].thumbnail = producto.thumbnail;
                        this.productos[i].stock = producto.stock;
                        this.productos[i].timestamp = producto.timestamp;
                        prodActualizado = this.productos[i];
                        response = true;
                    }
                    ;
                }
                ;
                return [2 /*return*/, response];
            });
        });
    };
    ;
    MemoryDao.prototype.leerMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("lista de mensajes en memoria", this.messages);
                return [2 /*return*/, this.messages];
            });
        });
    };
    ;
    MemoryDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                response = true;
                this.messageNuevoId++;
                message = {
                    author: mensaje.author,
                    fecha: mensaje.fecha,
                    text: mensaje.text,
                    id: this.messageNuevoId
                };
                this.messages.push(message);
                return [2 /*return*/, response];
            });
        });
    };
    ;
    MemoryDao.prototype.agregarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, i, i, prod;
            return __generator(this, function (_a) {
                response = false;
                try {
                    console.log("cant productos en carrito", this.carrito.productos.length);
                    if (this.carrito.productos.length > 0) {
                        for (i = 0; i < this.carrito.productos.length; i++) {
                            if (this.carrito.productos[i].id == parseInt(id)) {
                                console.log("el producto ya se encuentra en el carrito");
                                response = false;
                                return [2 /*return*/, response];
                            }
                        }
                    }
                    for (i = 0; i < this.productos.length; i++) {
                        if (this.productos[i].id == parseInt(id)) {
                            prod = {
                                code: this.productos[i].code,
                                title: this.productos[i].title,
                                description: this.productos[i].description,
                                price: this.productos[i].price,
                                thumbnail: this.productos[i].thumbnail,
                                stock: this.productos[i].stock,
                                timestamp: this.productos[i].timestamp,
                                id: this.productos[i].id
                            };
                            this.carrito.productos.push(prod);
                            response = true;
                            return [2 /*return*/, response];
                        }
                        ;
                    }
                    ;
                    response = false;
                    console.log("producto no encontrado");
                }
                catch (error) {
                    console.log(error);
                    response = false;
                }
                return [2 /*return*/, response];
            });
        });
    };
    ;
    MemoryDao.prototype.buscarProdCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productos, _i, _a, prod, producto;
            return __generator(this, function (_b) {
                productos = [];
                console.log("entro a buscar por id");
                if (this.carrito.productos.length > 0) {
                    for (_i = 0, _a = this.carrito.productos; _i < _a.length; _i++) {
                        prod = _a[_i];
                        if (prod.id === parseInt(id)) {
                            producto = {
                                code: prod.code,
                                title: prod.title,
                                description: prod.description,
                                price: prod.price,
                                thumbnail: prod.thumbnail,
                                stock: prod.stock,
                                timestamp: prod.timestamp
                            };
                            productos.push(producto);
                            return [2 /*return*/, productos];
                        }
                    }
                    console.log("no encontro el producto en el carrito");
                    return [2 /*return*/, false];
                }
                else {
                    console.log("el carrito no tiene productos");
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    MemoryDao.prototype.listarProdsCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productos, _i, _a, prod, producto;
            return __generator(this, function (_b) {
                productos = [];
                try {
                    for (_i = 0, _a = this.carrito.productos; _i < _a.length; _i++) {
                        prod = _a[_i];
                        console.log("productos del carrito", this.carrito.productos);
                        producto = {
                            code: prod.code,
                            title: prod.title,
                            description: prod.description,
                            price: prod.price,
                            thumbnail: prod.thumbnail,
                            stock: prod.stock,
                            timestamp: prod.timestamp
                        };
                        productos.push(producto);
                    }
                    return [2 /*return*/, productos];
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/, productos];
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    MemoryDao.prototype.borrarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, i;
            return __generator(this, function (_a) {
                response = false;
                try {
                    for (i = 0; i < this.carrito.productos.length; i++) {
                        if (this.carrito.productos[i].id == parseInt(id)) {
                            this.carrito.productos.splice(i, 1);
                            response = true;
                        }
                        ;
                    }
                    ;
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/, response];
            });
        });
    };
    ;
    return MemoryDao;
}());
;
exports.default = MemoryDao;
