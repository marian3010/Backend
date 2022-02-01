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
exports.miCarrito = void 0;
var express_1 = __importDefault(require("express"));
var carritoRouter = express_1.default.Router();
var carrito_js_1 = __importDefault(require("../modelo/carrito.js"));
var login_1 = require("./login");
var users_js_1 = require("../model/users.js");
exports.miCarrito = new carrito_js_1.default();
var logger_js_1 = require("../logger.js");
var comunicacion_1 = require("../comunicacion");
//listar productos del carrito
carritoRouter.get('/listar/:id?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idBuscar, producto, productos, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                idBuscar = (req.params.id);
                if (!idBuscar) return [3 /*break*/, 2];
                logger_js_1.consoleLogger.info("busca productos en el carrito con id " + idBuscar);
                return [4 /*yield*/, exports.miCarrito.buscarProdCarrito(idBuscar)];
            case 1:
                producto = _a.sent();
                res.json(producto);
                return [3 /*break*/, 4];
            case 2:
                logger_js_1.consoleLogger.info("va a buscar productos sin parametro al carrito");
                return [4 /*yield*/, exports.miCarrito.listarProdsCarrito()];
            case 3:
                productos = _a.sent();
                res.json(productos);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                logger_js_1.errorLogger.error(err_1);
                logger_js_1.consoleLogger.error(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto/:cant', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prod, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.params.id_producto) return [3 /*break*/, 2];
                return [4 /*yield*/, exports.miCarrito.agregarProdsCarrito(req.params.id_producto, parseInt(req.params.cant))];
            case 1:
                prod = _a.sent();
                res.json(prod);
                return [3 /*break*/, 3];
            case 2:
                logger_js_1.warningLogger.warn("falta el parámetro ID del producto a agregar al carrito");
                logger_js_1.consoleLogger.warn("falta el parámetro ID del producto a agregar al carrito");
                res.send({ error: 'debe indicar el id de producto a agregar' });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                logger_js_1.errorLogger.error(err_2);
                logger_js_1.consoleLogger.error(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//borro producto del carrito
carritoRouter.delete('/borrar/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productoBorrado, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.miCarrito.borrarProdsCarrito(req.params.id)];
            case 1:
                productoBorrado = _a.sent();
                if (productoBorrado) {
                    res.json(productoBorrado);
                    return [2 /*return*/];
                }
                else {
                    logger_js_1.warningLogger.warn("falta parámetro ID del producto a borrar");
                    logger_js_1.consoleLogger.warn("falta parámetro ID del producto a borrar");
                    res.send(false);
                }
                ;
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                logger_js_1.errorLogger.error(err_3);
                logger_js_1.consoleLogger.error(err_3);
                return [3 /*break*/, 3];
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); });
//ruta para comprar el carrito
carritoRouter.post('/comprar/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productos, prodList, producto, listaProds, n, _i, productos_1, prod, user, ordenNro, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!login_1.nombreUsuario) return [3 /*break*/, 1];
                logger_js_1.consoleLogger.warn("Usuario no logueado, no se puede completar la compra");
                res.send({ error: 'Usuario no logueado, no se puede completar la compra. Debe loguearse.' });
                return [3 /*break*/, 8];
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!req.params.id) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.miCarrito.listarProdsCarrito()];
            case 2:
                productos = _a.sent();
                prodList = [];
                producto = {};
                listaProds = "";
                n = 1;
                for (_i = 0, productos_1 = productos; _i < productos_1.length; _i++) {
                    prod = productos_1[_i];
                    producto = {
                        idProducto: prod.id,
                        codProducto: prod.code,
                        descripcion: prod.description,
                        precioUnitario: prod.price,
                        cantidad: prod.cantidad,
                        precioTotal: prod.cantidad * prod.price
                    };
                    prodList.push(producto);
                    listaProds = listaProds + (n + " - CodProducto: " + prod.code + ", Descripcion: " + prod.description + ", Precio Unitario: " + prod.price + ", Cantidad: " + prod.cantidad + ", Precio Total: " + prod.cantidad * prod.price + " // ");
                    n++;
                }
                logger_js_1.consoleLogger.info("nombreUsuario " + login_1.nombreUsuario);
                return [4 /*yield*/, (0, users_js_1.buscoDatosUser)(login_1.nombreUsuario)];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, exports.miCarrito.generarOrden(user.email, prodList)];
            case 4:
                ordenNro = _a.sent();
                (0, comunicacion_1.gmailCompra)(listaProds, user.username, user.email, ordenNro);
                (0, comunicacion_1.wappCompra)(listaProds, user.username, user.email, ordenNro);
                (0, comunicacion_1.smsCompra)(user.phone, ordenNro);
                res.json(productos);
                return [3 /*break*/, 6];
            case 5:
                logger_js_1.warningLogger.warn("falta el parámetro ID del carrito");
                logger_js_1.consoleLogger.warn("falta el parámetro ID del carrito");
                res.send({ error: 'debe indicar el id del carrito a comprar' });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_4 = _a.sent();
                logger_js_1.errorLogger.error(err_4);
                logger_js_1.consoleLogger.error(err_4);
                return [3 /*break*/, 8];
            case 8:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.default = carritoRouter;
