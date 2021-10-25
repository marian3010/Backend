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
var admin = require("firebase-admin");
var serviceAccount = require("../../data/ecommerce-43372-firebase-adminsdk-sakea-fd16d38086.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-43372.firebaseio.com",
});
console.log("Base de datos conectada");
var firestoreAdmin = admin.firestore();
var FirebaseDao = /** @class */ (function () {
    function FirebaseDao() {
    }
    FirebaseDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collection, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        console.log("agregar por firebase");
                        return [4 /*yield*/, collection.doc().create(producto)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        resultado = false;
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, resultado];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, collection, query, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collection.get()];
                    case 2:
                        query = _a.sent();
                        response = query.docs.map(function (doc) {
                            var data = doc.data();
                            if (doc.id == id) {
                                var producto = {
                                    id: doc.id,
                                    code: data.code,
                                    title: data.title,
                                    description: data.description,
                                    price: data.price,
                                    thumbnail: data.thumbnail,
                                    stock: data.stock,
                                    timestamp: data.timestamp
                                };
                                productosArray.push(producto);
                            }
                        });
                        if (productosArray.length === 0) {
                            console.log("no encontro el producto");
                        }
                        return [2 /*return*/, productosArray];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, collection, query, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collection.get()];
                    case 2:
                        query = _a.sent();
                        response = query.docs.map(function (doc) {
                            var data = doc.data();
                            var producto = {
                                id: doc.id,
                                code: data.code,
                                title: data.title,
                                description: data.description,
                                price: data.price,
                                thumbnail: data.thumbnail,
                                stock: data.stock,
                                timestamp: data.timestamp
                            };
                            productosArray.push(producto);
                        });
                        return [2 /*return*/, productosArray];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.borrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collection, doc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, collection.doc(id).delete()];
                    case 2:
                        doc = _a.sent();
                        console.log("producto borrado", doc);
                        resultado = true;
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        resultado = false;
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, resultado];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.actualizarProducto = function (id, producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collection, doc, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, collection.doc(id).update(producto)];
                    case 2:
                        doc = _a.sent();
                        resultado = true;
                        console.log("producto actualizado", doc);
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, resultado];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.leerMensajes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mensajesArray, collection, query, response_1, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mensajesArray = [];
                        collection = firestoreAdmin.collection("mensajes");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collection.get()];
                    case 2:
                        query = _a.sent();
                        response_1 = query.docs.map(function (doc) {
                            var data = doc.data();
                            console.log(response_1);
                            var mensaje = {
                                id: doc.id,
                                author: data.author,
                                fecha: data.fecha,
                                text: data.text
                            };
                            mensajesArray.push(mensaje);
                        });
                        return [2 /*return*/, mensajesArray];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.guardarMensajes = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collection, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        collection = firestoreAdmin.collection("mensajes");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        console.log("agregar por firebase");
                        return [4 /*yield*/, collection.doc().create(mensaje)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        resultado = false;
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, resultado];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.agregarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collProds, collCart, collCartProd, query, existe_1, datosProductos, carritoID_1, nuevaQuery, existeCart_1, query_1, datosCarrito, query_2, producto, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, 11, 12]);
                        collProds = firestoreAdmin.collection("productos");
                        collCart = firestoreAdmin.collection("carrito");
                        collCartProd = firestoreAdmin.collection("productosCarrito");
                        console.log("Base de datos conectada");
                        return [4 /*yield*/, collProds.get()];
                    case 2:
                        query = _a.sent();
                        datosProductos = query.docs.map(function (doc) {
                            var datos = doc.data();
                            console.log("datos de producto", datos);
                            console.log("id del producto", doc.id);
                            if (doc.id == id) {
                                console.log("el producto existe");
                                existe_1 = true;
                            }
                        });
                        if (!existe_1) {
                            console.log("el producto no existe");
                            resultado = false;
                            return [2 /*return*/, resultado];
                        }
                        return [4 /*yield*/, collCart.get()];
                    case 3:
                        nuevaQuery = _a.sent();
                        nuevaQuery.docs.map(function (docs) {
                            carritoID_1 = docs.id;
                        });
                        if (!carritoID_1) return [3 /*break*/, 5];
                        console.log("existe el carrito", carritoID_1);
                        return [4 /*yield*/, collCartProd.get()];
                    case 4:
                        query_1 = _a.sent();
                        datosCarrito = query_1.docs.map(function (doc) {
                            var datos = doc.data();
                            if (datos.idProd == id) {
                                console.log("el producto ya existe en el carrito");
                                existeCart_1 = true;
                                return;
                            }
                        });
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, collCart.doc().create({ timestamp: Date.now() })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, collCart.get()];
                    case 7:
                        query_2 = _a.sent();
                        query_2.docs.map(function (docs) {
                            carritoID_1 = docs.id;
                        });
                        _a.label = 8;
                    case 8:
                        if (existeCart_1) {
                            console.log("el producto ya existe en el carrito");
                            resultado = false;
                            return [2 /*return*/, resultado];
                        }
                        producto = {
                            idCarrito: carritoID_1,
                            idProd: id
                        };
                        return [4 /*yield*/, collCartProd.doc().create(producto)];
                    case 9:
                        _a.sent();
                        resultado = true;
                        return [3 /*break*/, 12];
                    case 10:
                        error_8 = _a.sent();
                        console.log(error_8);
                        resultado = false;
                        return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, resultado];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.buscarProdCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, collProds, collCartProd, query, datosProductos, newQuery_1, prodsIds_1, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        collProds = firestoreAdmin.collection("productos");
                        collCartProd = firestoreAdmin.collection("productosCarrito");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, collCartProd.get()];
                    case 2:
                        query = _a.sent();
                        datosProductos = query.docs.map(function (doc) {
                            var datos = doc.data();
                            return datos;
                        });
                        return [4 /*yield*/, collProds.get()];
                    case 3:
                        newQuery_1 = _a.sent();
                        prodsIds_1 = newQuery_1.docs.map(function (docu) {
                            var data = docu.data();
                            return docu.id;
                        });
                        // Extraigo productos que coincidan con productos del carrito
                        datosProductos.map(function (datos) {
                            //solo en el caso que coincida el id del producto con el id parámetro, devuelvo los datos del producto
                            if (datos.idProd == id) {
                                var indexProdc = prodsIds_1.indexOf(datos.idProd);
                                if (indexProdc === -1) {
                                    console.log('no existe');
                                }
                                else {
                                    var data = newQuery_1.docs[indexProdc].data();
                                    var producto = {
                                        id: data.id,
                                        code: data.code,
                                        title: data.title,
                                        description: data.description,
                                        price: data.price,
                                        thumbnail: data.thumbnail,
                                        stock: data.stock,
                                        timestamp: data.timestamp
                                    };
                                    productosArray.push(producto);
                                }
                                ;
                            }
                            ;
                        });
                        return [2 /*return*/, productosArray];
                    case 4:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2 /*return*/, productosArray];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.listarProdsCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productosArray, collProds, collCartProd, query, datosProductos, newQuery_2, prodsIds_2, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        collProds = firestoreAdmin.collection("productos");
                        collCartProd = firestoreAdmin.collection("productosCarrito");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, collCartProd.get()];
                    case 2:
                        query = _a.sent();
                        datosProductos = query.docs.map(function (doc) {
                            var datos = doc.data();
                            return datos;
                        });
                        return [4 /*yield*/, collProds.get()];
                    case 3:
                        newQuery_2 = _a.sent();
                        prodsIds_2 = newQuery_2.docs.map(function (docu) {
                            var data = docu.data();
                            return docu.id;
                        });
                        // Extraigo productos que coincidan con productos del carrito
                        datosProductos.map(function (datos) {
                            // por cada producto en carrito, busco si existe en mi array
                            // de ids de productos, creados anteriormente
                            // chequeo si hay coincidencia usando el indexOf para obtener el index.
                            var indexProdc = prodsIds_2.indexOf(datos.idProd);
                            if (indexProdc === -1) {
                                console.log('no existe');
                            }
                            else {
                                var data = newQuery_2.docs[indexProdc].data();
                                var producto = {
                                    id: data.id,
                                    code: data.code,
                                    title: data.title,
                                    description: data.description,
                                    price: data.price,
                                    thumbnail: data.thumbnail,
                                    stock: data.stock,
                                    timestamp: data.timestamp
                                };
                                productosArray.push(producto);
                            }
                            ;
                        });
                        return [2 /*return*/, productosArray];
                    case 4:
                        error_10 = _a.sent();
                        console.log(error_10);
                        return [2 /*return*/, productosArray];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    FirebaseDao.prototype.borrarProdsCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, collCartProd, query, datosProductos, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = false;
                        collCartProd = firestoreAdmin.collection("productosCarrito");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collCartProd.get()];
                    case 2:
                        query = _a.sent();
                        datosProductos = query.docs.map(function (doc) {
                            var datos = doc.data();
                            var idBorrar = doc.id;
                            if (datos.idProd == id) {
                                var prodBorrado = collCartProd.doc(idBorrar).delete();
                                resultado = true;
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _a.sent();
                        console.log(error_11);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    ;
    return FirebaseDao;
}());
;
exports.default = FirebaseDao;
