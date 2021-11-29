import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';

// Defino la opción de Base de Datos
import {capaPersistencia} from './src/DaoFactory';
export const opcionCapa:number = capaPersistencia.fileSys;

import {Mensajes} from "./modelo/mensaje";
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';
import {loginRouter, sessionHandler} from './routes/login';
//import {loginRouter} from './routes/login';
const numCPUs = require ('os').cpus().length;
const cluster = require ('cluster');
const { fork } = require('child_process');

const isAdmin:boolean = true;
const __dirname = path.resolve();
const app = express();
const error = new Error("La ruta no es válida");
const notFoundMiddleware = () => (req: express.Request, _res: express.Response, next: express.NextFunction) => {return next(error);};
let port = 8080;
if (process.argv[2]) {
  port = parseInt(process.argv[2])
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
app.use('/ecommerce', loginRouter);
app.use(notFoundMiddleware); 

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));
app.engine("hbs", handlebars({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index.hbs",
})); 

let server: any;
///funcion para enviar msgs por socket
function msgSocket(server:any) {
  const io = new SocketIO.Server(server);

  server.on("error", (error:any) => {
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
  
}

///funcion para iniciar server como cluster
function serverCluster() {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(`Cantidad de CPUs: ${numCPUs}`);
    for (let index = 0; index < numCPUs; index += 1) {
      cluster.fork();
      
    }
  
    cluster.on(
      'exit',
      (worker:any) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
        
      },
    );
  } else {
    console.log(`Worker ${process.pid} is running`);
    server = app.listen(port, () => {
      console.log(`servidor listo en puerto ${port} | PID: ${process.pid}`)
    });
    msgSocket(server);
  }  
};

const modeChild = process.argv[5] || "fork";
console.log(modeChild);
if (modeChild === "cluster") {
    serverCluster();
    
} else {
  server = app.listen(port, () => {
    console.log(`servidor listo en puerto ${port} | PID: ${process.pid}`)
  })
  msgSocket(server);
};     

export default isAdmin;