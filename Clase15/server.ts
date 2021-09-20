import express from "express";
import path from "path";
import Mensaje from "./modelo/mensaje.js";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import fs from "fs";
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';
import Productos from './modelo/productos';


//const miCarrito = new Carrito();
const isAdmin:boolean = true;
const prods = new Productos();
const __dirname = path.resolve();
const port = 8080;
const app = express();
const notFoundMiddleware = () => (req: express.Request, _res: express.Response, next: express.NextFunction) => {return next(error);};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
app.use(notFoundMiddleware); 

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

export default isAdmin;