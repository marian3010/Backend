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
var mariaDB_1 = __importDefault(require("../db/mariaDB"));
var knex_1 = __importDefault(require("knex"));
var knexo = (0, knex_1.default)(mariaDB_1.default);
var Productos = /** @class */ (function () {
    function Productos() {
        knexo.schema.hasTable("productos")
            .then(function (response) {
            if (!response) {
                knexo.schema.createTable("productos", function (table) {
                    table.increments("id", { primaryKey: true });
                    table.string("code");
                    table.string("title").notNullable();
                    table.string("description");
                    table.integer("price").notNullable();
                    table.string("thumbnail");
                    table.integer("stock");
                    table.integer("timestamp");
                })
                    .then(function () { return console.log("tabla productos creada"); })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
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
                        return [4 /*yield*/, knexo("productos").insert(producto)];
                    case 1:
                        response = _a.sent();
                        console.log("Id del producto agregado", response);
                        return [2 /*return*/, producto];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Productos.prototype.buscarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prodsArray, rows, _i, rows_1, row, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prodsArray = [];
                        return [4 /*yield*/, knexo.from("productos")
                                .select("*")
                                .where("id", "=", id)];
                    case 1:
                        rows = _a.sent();
                        for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                            row = rows_1[_i];
                            prodsArray.push({ code: row["code"], title: row["title"], description: row["description"], price: row["price"], thumbnail: row["thumbnail"], stock: row["stock"], timestamp: row["timestamp"] });
                            console.log("producto encontrado", prodsArray);
                        }
                        return [2 /*return*/, prodsArray];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Productos.prototype.listarProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listaProductos, rows, _i, rows_2, row, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        listaProductos = [];
                        return [4 /*yield*/, knexo.from("productos")
                                .select("*")];
                    case 1:
                        rows = _a.sent();
                        for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                            row = rows_2[_i];
                            listaProductos.push({ code: row["code"], title: row["title"], description: row["description"], price: row["price"], thumbnail: row["thumbnail"], stock: row["stock"], timestamp: row["timestamp"], id: row["id"] });
                        }
                        return [2 /*return*/, listaProductos];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
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
                        return [4 /*yield*/, knexo.from("productos")
                                .where("id", "=", id)
                                .del()];
                    case 1:
                        response = _a.sent();
                        console.log("respuesta del delete", response);
                        return [2 /*return*/, response];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Productos.prototype.actualizarProducto = function (code, title, description, price, thumbnail, stock, id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, knexo.from("productos").where("id", "=", id)
                                .update("code", code)
                                .update("title", title)
                                .update("description", description)
                                .update("price", price)
                                .update("thumbnail", thumbnail)
                                .update("stock", stock)
                                .update("timestamp", Date.now())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
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
