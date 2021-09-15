import express from "express";
import path from "path";
import Productos from "./productos.js";
import Carrito from "./carrito.js";
import Mensaje from "./mensaje.js";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import fs from "fs";

const prods = new Productos();
const miCarrito = new Carrito(1,Date.now());
const admin:boolean = true;

const __dirname = path.resolve();
const port = 8080;
const app = express();

const productosRouter = express.Router();
app.use('/productos', productosRouter);
const carritoRouter = express.Router();
app.use('/carrito', carritoRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));

app.engine("hbs", handlebars({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index.hbs",
}));

const server = app.listen(port, () => {
    console.log(`servidor listo en puerto ${port}`)
});

const io = new SocketIO.Server(server);

server.on("error", (error) => {
    console.error(error);
});

//verifico si hay mensajes guardados para mostrar
let messages: Mensaje[] = []
fs.readFile("./mensajes.txt", "utf-8", (error, contenido) => {
    if (error) {
        "hubo un error leyendo el archivo de mensajes"
        return
    };
    messages = JSON.parse(contenido);
});

io.on('connection', socket => {
    socket.emit('listarProductos', prods.listarProductos());
    console.log("se conectó el back");
    io.sockets.emit('listarProductos', prods.listarProductos());

    socket.emit("messages", messages);
    socket.on("new-message", (data) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
        fs.writeFile("mensajes.txt", JSON.stringify(messages, null, "\t"), "utf-8", (error) => {
            if (error) {
                "hubo un error en la escritura del archivo de mensajes"
                return
            };
        });
    });

});

///busco el producto por id y lo muestro
productosRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    if (req.params.id) {
        try {
            const producto = prods.buscarProducto(parseInt(req.params.id));
            if (producto) {
                io.sockets.emit('listarProductos', producto);
                res.sendFile(__dirname + "/listoProds.html");
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            }
        } catch (err) {
            console.log("hubo un error", err);
        }
    } else {
        io.sockets.emit('listarProductos', prods.listarProductos());
        res.sendFile(__dirname + "/listoProds.html");
    }    
});

//guardo un nuevo producto
productosRouter.get('/guardar', (req: express.Request, res: express.Response) => {
    if (admin) {
        res.sendFile(__dirname + "/agregoProd.html");
    } else {
        res.send({ error: -1, descripcion: 'ruta productos método guardar no autorizado' });
    }
});
productosRouter.post('/guardar', (req: express.Request, res: express.Response) => {
    if (admin) {
        prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
        io.sockets.emit('listarProductos', prods.listarProductos());
        res.sendFile(__dirname + "/listoProds.html");
    } else {
        res.send({ error: -1, descripcion: 'ruta productos método guardar no autorizado' });
    }
});

//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    if (admin) {
        try {
            const productoBorrado = prods.borrarProducto(parseInt(req.params.id));
            if (productoBorrado) {
                io.sockets.emit('listarProductos', prods.listarProductos());
                res.sendFile(__dirname + "/listoProds.html");
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            };
        } catch (err) {
            console.log("hubo un error", err);
        };
    } else {
        res.send({ error: -2, descripcion: 'ruta productos método borrar no autorizado' });
    }    
});

// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', (req: express.Request, res: express.Response) => {
    if (admin) {
        try {
            const prodAct = prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
            if (prodAct) {
                io.sockets.emit('listarProductos', prods.listarProductos());
                res.sendFile(__dirname + "/listoProds.html");
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            };
        } catch (err) {
            console.log("hubo un error", err);
        }
    } else {
        res.send({ error: -3, descripcion: 'ruta productos método actualizar no autorizado' });
    }     
});

//productosRouter.get('/', (req: express.Request, res: express.Response) => {
//    res.sendFile(__dirname + "/index.html");
//});

//listar carrito
carritoRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    if (req.params.id) {
        try {
            const producto = miCarrito.buscarProducto(parseInt(req.params.id));
            if (producto) {
                io.sockets.emit('listCarrito', miCarrito.listarProductos());
                res.sendFile(__dirname + "/carrito.html");
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
    const carrito = miCarrito.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
    io.sockets.emit('listCarrito', miCarrito.listarProductos());
    res.sendFile(__dirname + "/carrito.html");
});

//borro producto del carrito
carritoRouter.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = miCarrito.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            io.sockets.emit('listCarrito', miCarrito.listarProductos());
            res.sendFile(__dirname + "/carrito.html");
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
        
});
