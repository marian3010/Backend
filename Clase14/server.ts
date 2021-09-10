import express from "express";
import path from "path";
import Productos from "./productos.js";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import fs from "fs";

const prods = new Productos();

const router = express.Router();
const __dirname = path.resolve();
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use('/api', router);

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
interface mensaje{
    author: string;
    fecha: Date;
    text: string;
  }
let messages: mensaje[] = []
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

///listo todos los productos
router.get('/productos/listar', (req: express.Request, res: express.Response) => {
    try {
        const listProductos = prods.listarProductos();
        if (listProductos.length === 0) {
            res.send({ error: 'no hay productos cargados' });
            return;
        }
        res.send(listProductos);
    } catch (err) {
        console.log("hubo un error", err);
    }
})

///busco el producto por id y lo muestro
router.get('/productos/listar/:id', (req: express.Request, res: express.Response) => {
    try {
        const producto = prods.buscarProducto(parseInt(req.params.id));
        if (producto) {
            res.send(producto);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        }
    } catch (err) {
        console.log("hubo un error", err);
    }
});

//guardo un nuevo producto
router.post('/productos/guardar', (req: express.Request, res: express.Response) => {
    const producto = prods.agregarProducto(req.body.title, req.body.price, req.body.thumbnail);
    io.sockets.emit('listProdGlobal', prods.listarProductos());
    res.redirect('/api');

});

//busco un producto por id y lo borro
router.delete('/productos/borrar/:id', (req: express.Request, res: express.Response) => {
    try {
        const productoBorrado = prods.borrarProducto(parseInt(req.params.id));
        if (productoBorrado) {
            res.send(productoBorrado);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
});

// busco un producto por id y lo actualizo
router.put('/productos/actualizar/:id', (req: express.Request, res: express.Response) => {
    try {
        const prodAct = prods.actualizarProducto(req.body.title, req.body.price, req.body.thumbnail, parseInt(req.params.id));
        if (prodAct) {
            res.send(prodAct);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    }
})

router.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/index.html");
});

// Muestro una lista de productos
router.get('/productos/vista', (req: express.Request, res: express.Response) => {
    const listaProductos = prods.listarProductos();
    res.render("main.hbs", {
        listaProductos: listaProductos
    });
});