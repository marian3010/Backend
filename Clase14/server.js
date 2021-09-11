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
var productos_js_1 = __importDefault(require("./productos.js"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var fs_1 = __importDefault(require("fs"));
var prods = new productos_js_1.default();
var router = express_1.default.Router();
var __dirname = path_1.default.resolve();
var port = 8080;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
app.use('/api', router);
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
var messages = [];
fs_1.default.readFile("./mensajes.txt", "utf-8", function (error, contenido) {
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
///listo todos los productos
router.get('/productos/listar', function (req, res) {
    try {
        var listProductos = prods.listarProductos();
        if (listProductos.length === 0) {
            res.send({ error: 'no hay productos cargados' });
            return;
        }
        res.send(listProductos);
    }
    catch (err) {
        console.log("hubo un error", err);
    }
});
///busco el producto por id y lo muestro
router.get('/productos/listar/:id', function (req, res) {
    try {
        var producto = prods.buscarProducto(parseInt(req.params.id));
        if (producto) {
            res.send(producto);
            return;
        }
        else {
            res.send({ error: 'producto no encontrado' });
        }
    }
    catch (err) {
        console.log("hubo un error", err);
    }
});
//guardo un nuevo producto
router.post('/productos/guardar', function (req, res) {
    var producto = prods.agregarProducto(req.body.title, req.body.price, req.body.thumbnail);
    io.sockets.emit('listProdGlobal', prods.listarProductos());
    res.redirect('/api');
});
//busco un producto por id y lo borro
router.delete('/productos/borrar/:id', function (req, res) {
    try {
        var productoBorrado = prods.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            res.send(productoBorrado);
            return;
        }
        else {
            res.send({ error: 'producto no encontrado' });
        }
        ;
    }
    catch (err) {
        console.log("hubo un error", err);
    }
    ;
});
// busco un producto por id y lo actualizo
router.put('/productos/actualizar/:id', function (req, res) {
    try {
        var prodAct = prods.actualizarProducto(req.body.title, req.body.price, req.body.thumbnail, parseInt(req.params.id));
        if (prodAct) {
            res.send(prodAct);
            return;
        }
        else {
            res.send({ error: 'producto no encontrado' });
        }
        ;
    }
    catch (err) {
        console.log("hubo un error", err);
    }
});
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
// Muestro una lista de productos
router.get('/productos/vista', function (req, res) {
    var listaProductos = prods.listarProductos();
    res.render("main.hbs", {
        listaProductos: listaProductos
    });
});
