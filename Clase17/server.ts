import express from "express";
import path from "path";
import Mensaje from "./modelo/mensaje.js";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';

const isAdmin:boolean = true;
const __dirname = path.resolve();
const port = 8080;
const app = express();
const error = new Error("La ruta no es válida");
const notFoundMiddleware = () => (req: express.Request, _res: express.Response, next: express.NextFunction) => {return next(error);};
const options = {
  client: "sqlite3",
  connection: {
      port: 3306,
      host: "localhost",
      user: "root",
      password: "",
      database: "test",
  },
  pool: {
      min: 0,
      max: 10,
  }
};
import knex from "knex";
const knexo = knex(options);

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
let messages: Mensaje[] = [];

(async () => {
    try {
      messages = await knexo.from("mensajes").select("*");
    } catch(error) {
      console.log (error);
    } finally {
      knexo.destroy();
    }
  })();

io.on('connection', socket => {
    //socket.emit('listarProductos', prods.listarProductos());
    console.log("se conectó el back");
    //io.sockets.emit('listarProductos', prods.listarProductos());

    socket.emit("messages", messages);
    socket.on("new-message", (data) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
        knexo.from("mensajes").insert(data);
        knexo.destroy();
    });
});


export default isAdmin;