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
var FirebaseDao = /** @class */ (function () {
    function FirebaseDao() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ecommerce-43372.firebaseio.com",
        });
        console.log("Base de datos conectada");
    }
    ;
    FirebaseDao.prototype.agregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, firestoreAdmin, collection, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        firestoreAdmin = admin.firestore();
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
            var firestoreAdmin, collection, doc, item, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firestoreAdmin = admin.firestore();
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        doc = collection.doc("" + id);
                        return [4 /*yield*/, doc.get()];
                    case 2:
                        item = _a.sent();
                        response = item.data;
                        console.log("resultado query", response);
                        return [2 /*return*/, response];
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
            var productosArray, firestoreAdmin, collection, query, response_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productosArray = [];
                        firestoreAdmin = admin.firestore();
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, collection.get()];
                    case 2:
                        query = _a.sent();
                        response_1 = query.docs.map(function (doc) {
                            var data = doc.data();
                            console.log(response_1);
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
            var resultado, firestoreAdmin, collection, doc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        firestoreAdmin = admin.firestore();
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, collection.doc(id).delete()];
                    case 2:
                        doc = _a.sent();
                        console.log("producto borrado", doc);
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
            var resultado, firestoreAdmin, collection, doc, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = true;
                        firestoreAdmin = admin.firestore();
                        collection = firestoreAdmin.collection("productos");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, collection.doc(id).update(producto)];
                    case 2:
                        doc = _a.sent();
                        console.log("producto actualizado", doc);
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
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
    return FirebaseDao;
}());
;
exports.default = FirebaseDao;
