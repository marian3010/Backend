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
var productos_js_1 = __importDefault(require("./modelo/productos.js"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var fs_1 = __importDefault(require("fs"));
var prods = new productos_js_1.default();
//const miCarrito = new Carrito();
var admin = true;
var __dirname = path_1.default.resolve();
var port = 8080;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
var productosRouter = express_1.default.Router();
app.use('/productos', productosRouter);
var carritoRouter = express_1.default.Router();
app.use('/carrito', carritoRouter);
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
///busco el producto por id y lo muestro
productosRouter.get('/listar/:id?', function (req, res) {
    // creo una variable general para almacenar producto
    var producto;
    if (req.params.id) {
        // si hay id le asigno el producto que traiga
        producto = [prods.buscarProducto(parseInt(req.params.id))];
    }
    else {
        // si no hay id traigo todos
        producto = prods.listarProductos();
    }
    // le devuelvo al fetch un json con lo que obtuve
    res.json(producto);
});
productosRouter.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/listoProds.html");
});
//guardo un nuevo producto
productosRouter.get('/guardar', function (req, res, next) {
    if (admin) {
        res.sendFile(__dirname + "/public/agregoProd.html");
    }
    else {
        return next(error);
    }
});
productosRouter.post('/guardar', function (req, res, next) {
    if (admin) {
        var prod = prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
        res.json(prod);
    }
    else {
        return next(error);
    }
});
//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', function (req, res, next) {
    if (admin) {
        try {
            var productoBorrado = prods.borrarProducto(parseInt(req.params.id));
            if (productoBorrado) {
                res.json(productoBorrado);
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
    }
    else {
        return next(error);
    }
});
// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', function (req, res, next) {
    if (admin) {
        try {
            var prodAct = prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
            if (prodAct) {
                res.json(prodAct);
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
    }
    else {
        return next(error);
    }
});
//listar carrito
//carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
//    fs.readFile("./data/carrito.txt", "utf-8", (error, contenido) => {
//       if (error) {
//           "hubo un error leyendo el archivo del carrito"
//           return
//        };
//        const miCarrito = JSON.parse(contenido);
//    });
//    if (req.params.id) {
//        try {
/*            const producto = miCarrito.buscarProducto(parseInt(req.params.id));
            if (producto) {
                io.sockets.emit('listCarrito', miCarrito.listarProductos());
                res.sendFile(__dirname + "/public/carrito.html");
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            }
        } catch (err) {
            console.log("hubo un error", err);
        }
    } else {

    }
});

//agrego producto al carrito
carritoRouter.post('/agregar/:id_producto', (req: express.Request, res: express.Response) => {
    miCarrito.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    io.sockets.emit('listCarrito', miCarrito.listarProductos());
    res.sendFile(__dirname + "/public/carrito.html");
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            io.sockets.emit('listCarrito', miCarrito.listarProductos());
            res.sendFile(__dirname + "/public/carrito.html");
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
        
});*/
