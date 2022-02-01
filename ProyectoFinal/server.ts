import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import * as SocketIO from 'socket.io';
import {consoleLogger, errorLogger, warningLogger} from './logger.js'
import DaoFactory from './src/DaoFactory';
import MariaDBDao from './src/daos/MariaDBDao';
import MongoDBDao from './src/daos/MongoDBDao';
import Sqlite3Dao from './src/daos/Sqlite3Dao';
import FsDao from './src/daos/FsDao';
import MemoryDao from './src/daos/MemoryDao';
import { smsMensajeAdmin } from "./comunicacion";
import {Mensajes} from "./modelo/mensaje";
import productosRouter from './routes/products';
import carritoRouter from './routes/carts';
import {loginRouter, sessionHandler} from './routes/login';
import {MongoClient} from 'mongodb';
import MessageRepository from "./repositories/messageRepository";

const config = require("./config");
const numCPUs = require ('os').cpus().length;
const cluster = require ('cluster');

// Defino la opción de Base de Datos
// mongoAtlas será la opción por defecto y del config traigo la opción de persistencia según el entorno.
import {capaPersistencia} from './src/DaoFactory';
let index = capaPersistencia.findIndex(db => db === "mongoAtlas");
if (config.PERSISTENCIA) {
  const indexArg = capaPersistencia.findIndex(db => db === config.PERSISTENCIA);
  if (indexArg < 0) {
    consoleLogger.info("no existe esa persistencia")
  } else {
    index = indexArg;
  }
}
export const opcionCapa:number = index;
const daoFact = new DaoFactory(opcionCapa);
export const dao: MongoDBDao | Sqlite3Dao | MariaDBDao | FsDao | MemoryDao = daoFact.elegirBD()
consoleLogger.info("Dao", dao);

export const isAdmin:boolean = true;
const __dirname = path.resolve();
const app = express();
const error = new Error("La ruta no es válida");
const notFoundMiddleware = () => (req: express.Request, _res: express.Response, next: express.NextFunction) => {return next(error);};

const port = parseInt(config.PORT)

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
    consoleLogger.error(error);  
    errorLogger.error(error);
  });
  
  const msgList = new Mensajes();
  
  io.on('connection', async socket => {
    consoleLogger.info("se conectó el back");
    try {
      consoleLogger.info("Contectando a la Base de datos...");
      const connection: MongoClient = await MongoClient.connect(
        "mongodb://localhost",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      const messageRepository: MessageRepository = new MessageRepository(
        connection.db("ecommerce"),
        "mensajes"
      );
      consoleLogger.info("Base de datos conectada");
      const messages = await messageRepository.find()
      //const messages = await msgList.leerMensajes();
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
          //await msgList.guardarMensajes(data);
          await messageRepository.create(data);
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

if (config.MODO_CLUSTER === true) {
  consoleLogger.info(`modo de ejecucion cluster`);
  serverCluster();
} else {
  consoleLogger.info(`modo de ejecucion fork`);
  server = app.listen(port, () => {
    consoleLogger.info(`servidor listo en puerto ${port} | PID: ${process.pid}`)
  })
  msgSocket(server);
};     

