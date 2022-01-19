import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
const compression = require('compression');

// Defino la opción de Base de Datos
import {capaPersistencia} from './src/DaoFactory';
let index = capaPersistencia.findIndex(db => db === "mongoAtlas");

if (process.argv[3]) {
  const indexArg = capaPersistencia.findIndex(db => db === process.argv[3]);
  if (indexArg < 0) {
    consoleLogger.info("no existe esa persistencia")
  } else {
    index = indexArg;
  }
  
}
export const opcionCapa:number = index;
import { smsMensajeAdmin } from "./comunicacion";

import {Mensajes} from "./modelo/mensaje";
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';
import {loginRouter, sessionHandler} from './routes/login';
import {consoleLogger, errorLogger, warningLogger} from './logger.js'

const numCPUs = require ('os').cpus().length;
const cluster = require ('cluster');

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
app.use(compression());

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
    consoleLogger.error(error);  
    errorLogger.error(error);
  });
  
  const msgList = new Mensajes();
  
  io.on('connection', async socket => {
      consoleLogger.info("se conectó el back");
      try {
       const messages = await msgList.leerMensajes();
          if (messages) {
          socket.emit("messages", messages);
          socket.on("new-message", async (data) => {
            const texto = data.text
            const autor = data.author
            if (texto.indexOf("administrador")>= 0) {
              smsMensajeAdmin(texto, autor);
            }  
            messages.push(data);
            io.sockets.emit("messages", messages);
            consoleLogger.info(`mensaje a guardar - data ${data}`);
            await msgList.guardarMensajes(data);
          })
        }
      } catch (err) {
        consoleLogger.error(err);
        errorLogger.error(err);
      }  
  });
  
}

///funcion para iniciar server como cluster
function serverCluster() {
  if (cluster.isMaster) {
    consoleLogger.info(`Master ${process.pid} is running`);
    consoleLogger.info(`Cantidad de CPUs: ${numCPUs}`);
    for (let index = 0; index < numCPUs; index += 1) {
      cluster.fork();
      
    }
  
    cluster.on(
      'exit',
      (worker:any) => {
        consoleLogger.info(`Worker ${worker.process.pid} died`);
        cluster.fork();
        
      },
    );
  } else {
    consoleLogger.info(`Worker ${process.pid} is running`);
    server = app.listen(port, () => {
      consoleLogger.info(`servidor listo en puerto ${port} | PID: ${process.pid}`)
    });
    msgSocket(server);
  }  
};

//const modeChild = process.argv[5] || "fork";
const modeCluster = false;

if (modeCluster) {
    consoleLogger.info(`modo de ejecución cluster`);
    serverCluster();
} else {
  consoleLogger.info(`modo de ejecución fork`);
  server = app.listen(port, () => {
    consoleLogger.info(`servidor listo en puerto ${port} | PID: ${process.pid}`)
    
  })
  msgSocket(server);
};     

export default isAdmin;