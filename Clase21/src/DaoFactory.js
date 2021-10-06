"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { MemoryDao } from "./daos/memoryDao";
//import { FsDao } from "./daos/fsDao";
var MariaDBDao_1 = __importDefault(require("./daos/MariaDBDao"));
var Sqlite3Dao_1 = __importDefault(require("./daos/Sqlite3Dao"));
var MongoDBDao_1 = __importDefault(require("./daos/MongoDBDao"));
var DaoFactory = /** @class */ (function () {
    function DaoFactory() {
    }
    ;
    DaoFactory.prototype.elegirBD = function (tipo) {
        console.log("tipo de BD", tipo);
        switch (tipo) {
            // case 0:
            //    return new MemoryDao()
            //case 1:
            //    return new FsDao()
            case 2:
                return new MariaDBDao_1.default();
            case 3:
                return new Sqlite3Dao_1.default();
            case 4:
                return new MongoDBDao_1.default();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.default = DaoFactory;
