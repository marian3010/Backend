"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capaPersistencia = void 0;
var MemoryDao_1 = __importDefault(require("./daos/MemoryDao"));
var FsDao_1 = __importDefault(require("./daos/FsDao"));
var MariaDBDao_1 = __importDefault(require("./daos/MariaDBDao"));
var Sqlite3Dao_1 = __importDefault(require("./daos/Sqlite3Dao"));
var MongoDBDao_1 = __importDefault(require("./daos/MongoDBDao"));
var FirebaseDao_1 = __importDefault(require("./daos/FirebaseDao"));
var logger_js_1 = require("../logger.js");
exports.capaPersistencia = {
    memory: 0,
    fileSys: 1,
    mariaDB: 2,
    sqlite: 3,
    mongoLocal: 4,
    mongoAtlas: 5,
    firebase: 6
};
var DaoFactory = /** @class */ (function () {
    function DaoFactory(tipo) {
        this.tipo = tipo;
    }
    DaoFactory.prototype.elegirBD = function () {
        logger_js_1.consoleLogger.info("tipo de BD " + this.tipo);
        switch (this.tipo) {
            case 0:
                return new MemoryDao_1.default();
            case 1:
                return new FsDao_1.default();
            case 2:
                return new MariaDBDao_1.default();
            case 3:
                return new Sqlite3Dao_1.default();
            case 4:
                return new MongoDBDao_1.default();
            case 5:
                return new MongoDBDao_1.default();
            case 6:
                return new FirebaseDao_1.default();
            default:
                throw new Error("DAO no encontrado");
        }
    };
    return DaoFactory;
}());
exports.default = DaoFactory;
