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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var fs_1 = __importDefault(require("fs"));
var products_1 = __importDefault(require("./routes/products"));
var carts_1 = __importDefault(require("./routes/carts"));
var productos_1 = __importDefault(require("./modelo/productos"));
//const miCarrito = new Carrito();
var isAdmin = true;
var prods = new productos_1.default();
var __dirname = path_1.default.resolve();
var port = 8080;
var app = (0, express_1.default)();
var notFoundMiddleware = function () { return function (req, _res, next) { return next(error); }; };
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
app.use('/productos', products_1.default);
app.use('/carrito', carts_1.default);
app.use(notFoundMiddleware);
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, 'views'));
app.engine("hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index.hbs",
}));
var server = app.listen(port, function () {
    console.log("servidor listo en puerto " + port);
});
var io = new SocketIO.Server(server);
server.on("error", function (error) {
    console.error(error);
});
//verifico si hay mensajes guardados para mostrar
var messages = [];
fs_1.default.readFile("./data/mensajes.txt", "utf-8", function (error, contenido) {
    if (error) {
        "hubo un error leyendo el archivo de mensajes";
        return;
    }
    ;
    messages = JSON.parse(contenido);
});
io.on('connection', function (socket) {
    socket.emit('listarProductos', prods.listarProductos());
    console.log("se conectó el back");
    io.sockets.emit('listarProductos', prods.listarProductos());
    socket.emit("messages", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
        fs_1.default.writeFile("mensajes.txt", JSON.stringify(messages, null, "\t"), "utf-8", function (error) {
            if (error) {
                "hubo un error en la escritura del archivo de mensajes";
                return;
            }
            ;
        });
    });
});
var error = new Error("No tiene autorización para esta ruta");
exports.default = isAdmin;
