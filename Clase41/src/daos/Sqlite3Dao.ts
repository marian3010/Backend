import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/sqlite3';
import knex from "knex";
import {consoleLogger, errorLogger, warningLogger} from '../../logger.js'
const knexSQLite3 = knex(options);
import {opcionCapa} from '../../server';


if (opcionCapa === 3) {
    knexSQLite3.schema.hasTable("productos")
        .then(response => {
            consoleLogger.info(`respuesta al create table productos ${response}`)
            if(!response) {
                knexSQLite3.schema.createTable("productos", (table:any) => {
                    table.increments("id",{primaryKey:true})
                    table.string("code");
                    table.string("title").notNullable();
                    table.string("description");
                    table.integer("price").notNullable();
                    table.string("thumbnail");
                    table.integer("stock");
                    table.integer("timestamp");
                })
            .then(() => consoleLogger.info("tabla productos creada en SQLite"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexSQLite3.schema.hasTable("mensajes")
        .then(res => {
            consoleLogger.info(`respuesta al create table mensajes ${res}`)
            if(!res) {
                knexSQLite3.schema.createTable("mensajes", (table:any) => {
                    table.string("author");
                    table.string("fecha");
                    table.string("text");
                })
            .then(() => consoleLogger.info("tabla mensajes creada en SQLite"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexSQLite3.schema.hasTable("carrito")
        .then(resp => {
            consoleLogger.info(`respuesta al create table carrito ${resp}`)
            if(!resp) {
                knexSQLite3.schema.createTable("carrito", (table:any) => {
                    table.increments("id",{primaryKey:true});
                    table.integer("timestamp");
                })
            .then(() => consoleLogger.info("tabla carrito creada en SQLite"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexSQLite3.schema.hasTable("productosCarrito")
        .then(respo => {
            consoleLogger.info(`respuesta al create table productosCarrito ${respo}`)
            if(!respo) {
                knexSQLite3.schema.createTable("productosCarrito", (table:any) => {
                    table.increments("id",{primaryKey:true});
                    table.integer('idCarrito').notNullable();
                    table.integer('idProducto').notNullable();
                    
                })
            .then(() => consoleLogger.info("tabla productosCarrito creada en SQLite"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
};

class Sqlite3Dao implements Operaciones {
    private static instance: Sqlite3Dao;
    
    constructor () {
        if (typeof Sqlite3Dao.instance === 'object') {
            consoleLogger.warn("ya existe el objeto")
            return Sqlite3Dao.instance;
        }
        Sqlite3Dao.instance = this;
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            consoleLogger.info('agregar por SQLite3')
            const response = await knexSQLite3("productos").insert(producto);
            consoleLogger.info(`Id del producto agregado ${response}`)
        }
        catch (error) {
            resultado = false;
            errorLogger.error(error);
        }
        return resultado;
    }

    async buscarProducto(id:any) {
        //let productos = [];
        try {
            consoleLogger.info('buscar por SQLite3')
            const prod = await knexSQLite3.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            consoleLogger.info(`producto encontrado ${prod}`)
            //productos.push(prod)
            return prod;
        }
        catch (error) {
            errorLogger.error(error);
        }
    }

    async listarProductos() {
        try {
            consoleLogger.info("listar productos por SQLite3")
            const rows = await knexSQLite3.from("productos")
            .select("*")
            consoleLogger.info(`productos encontrados ${rows}`)
            return rows;
        } 
        catch (error) {
            errorLogger.error(error);
        }
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = false;
        try {
            const response = await knexSQLite3.from("productos")
            .where("id", "=", parseInt(id))
            .del();
            if (response) {
                resultado = true;
            }
        }
        catch (error){
            errorLogger.error(error);
        }
        return resultado;
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = false;
        try {
            const response = await knexSQLite3.from("productos").where("id","=",parseInt(id))
            .update(producto)
            if (response) {
                resultado = true;
            }
        }
        catch (error) {
            errorLogger.error(error);
            resultado = false;
        }
        return resultado;
    }

    async leerMensajes() {
        try {
            const rows = await knexSQLite3.from("mensajes")
            .select("*")
            consoleLogger.info(`mensajes encontrados ${rows}`)
            return rows;
        }
        catch(error) {
            errorLogger.error(error);
        } 
    };   

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        try {
            consoleLogger.info('agregar mensaje por mariaDB')
            await knexSQLite3("mensajes").insert(mensaje);
        }
        catch (error) {
            errorLogger.error(error);
            response = false;
        }
        return response;
    };

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            //verifico si el producto existe
            const prodAgregar = await knexSQLite3("productos").select("id").where("id", "=", parseInt(id));
            if (prodAgregar.length == 0){
                warningLogger.warn("producto no encontrado")
                consoleLogger.warn("producto no encontrado")
                response = false;
                return response;
            }
            //verifico si el producto ya existe en el carrito
            const prodCart = await knexSQLite3("productosCarrito").select("id").where("idProducto", "=", parseInt(id));
            if (prodCart.length > 0) {
                consoleLogger.info("el producto ingresado ya existe en el carrito");
                response = false;
                return response;
            }
            // verifico si existe el carrito
            let carritoID = await knexSQLite3("carrito").select("id");
            // si no existe el carrito lo creo
            if (carritoID.length == 0) {
                carritoID = await knexSQLite3("carrito").insert({timestamp: Date.now()}).returning('id');
            } else {
                let prods=JSON.parse(JSON.stringify(carritoID))
                for (const prod of prods) {
                    carritoID = prod.id
                }
            }
            const producto = {
                idCarrito: carritoID,
                idProducto: id
            }
            await knexSQLite3("productosCarrito").insert(producto)
        } catch (error){
            errorLogger.error(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        try {
            const productoCart = await knexSQLite3("productosCarrito").select("id").where("idProducto", "=", parseInt(id))
            if (productoCart.length == 0) {
                consoleLogger.warn("el producto no está en el carrito")
                return producto;
            } 
            producto = await knexSQLite3("productos").select("*").where("id", "=", parseInt(id))
            return producto;
        }
        catch (error) {
            errorLogger.error(error);
            return producto;
        }
    }; 
    
    async listarProdsCarrito() {
        let productosArray: Producto [] = [];
        try {
            consoleLogger.info("listar productos carrito por SQLite")
            const rows = await knexSQLite3("productosCarrito").select("*")
            let productoInsert
            for (const row of rows) {
                let prods = await knexSQLite3("productos").select("*").where("id", "=", row.idProducto) 
                for (const prod of prods ) {
                    productoInsert = {
                        id: prod.id,
                        code: prod.code,
                        title: prod.title,
                        description: prod.description,
                        price: prod.price,
                        thumbnail: prod.thumbnail,
                        stock: prod.stock,
                        timestamp: prod.timestamp
                    }
                    productosArray.push(productoInsert);
                }
            }
        } 
        catch (error) {
            errorLogger.error(error);
        }
        return productosArray;
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = false;
        try {
            const resp = await knexSQLite3.from("productosCarrito")
            .where("idProducto", "=", parseInt(id))
            .del();
            if (resp) {
                response = true;
            }    
        }
        catch (error){
            errorLogger.error(error);
        }
        return response;
    };
}
export default Sqlite3Dao;