import { Operaciones } from "./interfaces/Operaciones";
//import { MemoryDao } from "./daos/memoryDao";
//import { FsDao } from "./daos/fsDao";
import MariaDBDao from "./daos/MariaDBDao";
import Sqlite3Dao from "./daos/Sqlite3Dao";
import MongoDBDao from "./daos/MongoDBDao";

const capa = {
    memory: 0,
    fileSys: 1,
    mariaDB: 2,
    sqlite: 3,
    mongo: 4
 }
export const capaPersistencia = capa;

class DaoFactory {
    private tipo:number

    constructor(tipo:number) {
        this.tipo = tipo
    }

    elegirBD(): Operaciones {
        console.log("tipo de BD", this.tipo)
        switch (this.tipo) {
           // case 0:
            //    return new MemoryDao()
            //case 1:
            //    return new FsDao()
            case 2:
                return new MariaDBDao()
            case 3:
                return new Sqlite3Dao()
            case 4:
                return new MongoDBDao()
            default:
                throw new Error("DAO no encontrado");           
        }
    }
}    

export default DaoFactory