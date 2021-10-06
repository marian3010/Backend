import express from "express";
import path from "path";
import {Mensajes, Mensaje} from "./modelo/mensaje";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';
import options from './db/sqlite3.js'

const isAdmin:boolean = true;
const __dirname = path.resolve();
const port = 8080;
const app = express();
const error = new Error("La ruta no es válida");
const notFoundMiddleware = () => (req: express.Request, _res: express.Response, next: express.NextFunction) => {return next(error);};

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

//OPCIONES DE PERSISTENCIA EN BASE DE DATOS
const memory: number = 0;
const fileSys: number = 1;
const mariaDB: number = 2;
const sqlite: number = 3;
const mongo: number = 4;

// Defino la opción de Base de Datos
export const opcionCapa:number = mongo;
console.log("opcion capa en server", opcionCapa);

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