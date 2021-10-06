import { Operaciones } from "./interfaces/Operaciones";
//import { MemoryDao } from "./daos/memoryDao";
//import { FsDao } from "./daos/fsDao";
import MariaDBDao from "./daos/MariaDBDao";
import Sqlite3Dao from "./daos/Sqlite3Dao";
import MongoDBDao from "./daos/MongoDBDao";


class DaoFactory {
    constructor () {
    };

    elegirBD(tipo: number): Operaciones {
        console.log("tipo de BD", tipo)
        switch (tipo) {
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

export default DaoFactory;