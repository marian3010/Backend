import express from "express";
import path from "path";
import Productos from "./modelo/productos.js";
import Carrito from "./modelo/carrito.js";
import Mensaje from "./modelo/mensaje.js";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import fs from "fs";

const prods = new Productos();
//const miCarrito = new Carrito();
const admin:boolean = true;

const __dirname = path.resolve();
const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const productosRouter = express.Router();
app.use('/productos', productosRouter);
const carritoRouter = express.Router();
app.use('/carrito', carritoRouter);

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
fs.readFile("./data/mensajes.txt", "utf-8", (error, contenido) => {
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
                return;
            };
        });
    });
});
const error = new Error("No tiene autorización para esta ruta");
///busco el producto por id y lo muestro
productosRouter.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    // creo una variable general para almacenar producto
    let producto
    if (req.params.id) {
        // si hay id le asigno el producto que traiga
        producto = [prods.buscarProducto(parseInt(req.params.id))]
    } else {
        // si no hay id traigo todos
        producto = prods.listarProductos();
    }
    // le devuelvo al fetch un json con lo que obtuve
    res.json(producto);
});

productosRouter.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/listoProds.html");
});

//guardo un nuevo producto
productosRouter.get('/guardar', (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (admin) {
        res.sendFile(__dirname + "/public/agregoProd.html");
    } else {
        return next(error);
    }
});
productosRouter.post('/guardar', (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (admin) {
        const prod = prods.agregarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock);
        res.json(prod);
    } else {
        return next(error);
    }
});

//busco un producto por id y lo borro
productosRouter.delete('/borrar/:id', (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (admin) {
        try {
            const productoBorrado = prods.borrarProducto(parseInt(req.params.id));
            if (productoBorrado) {
                res.json(productoBorrado);
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            };
        } catch (err) {
            console.log("hubo un error", err);
        };
    } else {
       return next(error);
    }    
});

// busco un producto por id y lo actualizo
productosRouter.put('/actualizar/:id', (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (admin) {
        try {
            const prodAct = prods.actualizarProducto(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, parseInt(req.params.id));
            if (prodAct) {
                res.json(prodAct);
                return;
            } else {
                res.send({ error: 'producto no encontrado' });
            };
        } catch (err) {
            console.log("hubo un error", err);
        }
    } else {
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
