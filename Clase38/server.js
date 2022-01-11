"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.opcionCapa = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var compression = require('compression');
// Defino la opción de Base de Datos
var DaoFactory_1 = require("./src/DaoFactory");
exports.opcionCapa = DaoFactory_1.capaPersistencia.firebase;
var comunicacion_1 = require("./comunicacion");
var mensaje_1 = require("./modelo/mensaje");
var products_1 = __importDefault(require("./routes/products"));
var carts_1 = __importDefault(require("./routes/carts"));
var login_1 = require("./routes/login");
var logger_js_1 = require("./logger.js");
var numCPUs = require('os').cpus().length;
var cluster = require('cluster');
var isAdmin = true;
var __dirname = path_1.default.resolve();
var app = (0, express_1.default)();
var error = new Error("La ruta no es válida");
var notFoundMiddleware = function () { return function (req, _res, next) { return next(error); }; };
var port = 8080;
if (process.argv[2]) {
    port = parseInt(process.argv[2]);
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
app.use('/productos', products_1.default);
app.use('/carrito', carts_1.default);
app.use('/ecommerce', login_1.loginRouter);
app.use(notFoundMiddleware);
app.use(compression());
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, 'views'));
app.engine("hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index.hbs",
}));
var server;
///funcion para enviar msgs por socket
function msgSocket(server) {
    var _this = this;
    var io = new SocketIO.Server(server);
    server.on("error", function (error) {
        logger_js_1.consoleLogger.error(error);
        logger_js_1.errorLogger.error(error);
    });
    var msgList = new mensaje_1.Mensajes();
    io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
        var messages_1, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_js_1.consoleLogger.info("se conectó el back");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, msgList.leerMensajes()];
                case 2:
                    messages_1 = _a.sent();
                    if (messages_1) {
                        socket.emit("messages", messages_1);
                        socket.on("new-message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var texto, autor;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        texto = data.text;
                                        autor = data.author;
                                        if (texto.indexOf("administrador") >= 0) {
                                            (0, comunicacion_1.smsMensajeAdmin)(texto, autor);
                                        }
                                        messages_1.push(data);
                                        io.sockets.emit("messages", messages_1);
                                        logger_js_1.consoleLogger.info("mensaje a guardar - data " + data);
                                        return [4 /*yield*/, msgList.guardarMensajes(data)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    logger_js_1.consoleLogger.error(err_1);
                    logger_js_1.errorLogger.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
///funcion para iniciar server como cluster
function serverCluster() {
    if (cluster.isMaster) {
        logger_js_1.consoleLogger.info("Master " + process.pid + " is running");
        logger_js_1.consoleLogger.info("Cantidad de CPUs: " + numCPUs);
        for (var index = 0; index < numCPUs; index += 1) {
            cluster.fork();
        }
        cluster.on('exit', function (worker) {
            logger_js_1.consoleLogger.info("Worker " + worker.process.pid + " died");
            cluster.fork();
        });
    }
    else {
        logger_js_1.consoleLogger.info("Worker " + process.pid + " is running");
        server = app.listen(port, function () {
            logger_js_1.consoleLogger.info("servidor listo en puerto " + port + " | PID: " + process.pid);
        });
        msgSocket(server);
    }
}
;
//const modeChild = process.argv[5] || "fork";
var modeCluster = false;
if (modeCluster) {
    logger_js_1.consoleLogger.info("modo de ejecuci\u00F3n cluster");
    serverCluster();
}
else {
    logger_js_1.consoleLogger.info("modo de ejecuci\u00F3n fork");
    server = app.listen(port, function () {
        logger_js_1.consoleLogger.info("servidor listo en puerto " + port + " | PID: " + process.pid);
    });
    msgSocket(server);
}
;
exports.default = isAdmin;
