import { Operaciones } from "./interfaces/Operaciones";
import MemoryDao from "./daos/MemoryDao";
import FsDao from "./daos/FsDao";
import MariaDBDao from "./daos/MariaDBDao";
import Sqlite3Dao from "./daos/Sqlite3Dao";
import MongoDBDao from "./daos/MongoDBDao";
import FirebaseDao from "./daos/FirebaseDao";
import {consoleLogger, errorLogger, warningLogger} from '../logger.js';

export const capaPersistencia = ["memory","fileSys","mariaDB","sqlite","mongoLocal","mongoAtlas","firebase"];

class DaoFactory {
    private tipo:number

    constructor(tipo:number) {
        this.tipo = tipo
    };

    elegirBD(): Operaciones {
        consoleLogger.info(`tipo de BD ${this.tipo}`)
        switch (this.tipo) {
            case 0:
                return new MemoryDao()
            case 1:
                return new FsDao()
            case 2:
                return new MariaDBDao()
            case 3:
                return new Sqlite3Dao()
            case 4:
                return new MongoDBDao()
            case 5:
                return new MongoDBDao()  
            case 6:
                return new FirebaseDao()      
            default:
                throw new Error("DAO no encontrado");           
        };
    };
};   

export default DaoFactory;