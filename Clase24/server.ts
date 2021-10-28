import express from "express";
import session from 'express-session';
import path from "path";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';

// Defino la opción de Base de Datos
import {capaPersistencia} from './src/DaoFactory';
export const opcionCapa:number = capaPersistencia.mongoLocal;

import {Mensajes} from "./modelo/mensaje";
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';

const isAdmin:boolean = true;
const __dirname = path.resolve();
const port = 8080;
const app = express();
const error = new Error("La ruta no es válida");
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

const msgList = new Mensajes();

io.on('connection', async socket => {
    console.log("se conectó el back");
    try {
     const messages = await msgList.leerMensajes();
        if (messages) {
        socket.emit("messages", messages);
        socket.on("new-message", async (data) => {
          messages.push(data);
          io.sockets.emit("messages", messages);
          console.log("mensajes", messages);
          console.log("mensaje a guardar - data", data);
          await msgList.guardarMensajes(data);
        })
      }
    } catch (err) {
      console.log(err);
    }  
});

export default isAdmin;