import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/mariaDB';
import knex from "knex";
import {consoleLogger, errorLogger, warningLogger} from '../../logger.js'
const knexMariaDB = knex(options);
import {opcionCapa} from '../../server';

if (opcionCapa === 2) {
    
    knexMariaDB.schema.hasTable("productos")
        .then(response => {
            consoleLogger.info(`respuesta al create table productos ${response}`)
            if(!response) {
                knexMariaDB.schema.createTable("productos", (table:any) => {
                    table.increments("id",{primaryKey:true})
                    table.string("code");
                    table.string("title").notNullable();
                    table.string("description");
                    table.integer("price").notNullable();
                    table.string("thumbnail");
                    table.integer("stock");
                    table.integer("timestamp");
                })
            .then(() => consoleLogger.info("tabla productos creada en mariaDB"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexMariaDB.schema.hasTable("mensajes")
        .then(res => {
            consoleLogger.info(`respuesta al create table mensajes ${res}`)
            if(!res) {
                knexMariaDB.schema.createTable("mensajes", (table:any) => {
                    table.string("author");
                    table.string("fecha");
                    table.string("text");
                })
            .then(() => consoleLogger.info("tabla mensajes creada en mariaDB"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexMariaDB.schema.hasTable("carrito")
        .then(resp => {
            consoleLogger.info(`respuesta al create table carrito ${resp}`)
            if(!resp) {
                knexMariaDB.schema.createTable("carrito", (table:any) => {
                    table.increments("id",{primaryKey:true});
                    table.integer("timestamp");
                })
            .then(() => consoleLogger.info("tabla carrito creada en mariaDB"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
    knexMariaDB.schema.hasTable("productosCarrito")
        .then(respo => {
            consoleLogger.info(`respuesta al create table productosCarrito ${respo}`)
            if(!respo) {
                knexMariaDB.schema.createTable("productosCarrito", (table:any) => {
                    table.increments("id",{primaryKey:true});
                    table.integer('idCarrito').notNullable();
                    table.integer('idProducto').notNullable();
                    
                })
            .then(() => consoleLogger.info("tabla productosCarrito creada en mariaDB"))
            .catch((error) => {
                errorLogger.error(error);
                })
            }
        });
};

class MariaDBDao implements Operaciones {
    private static instance: MariaDBDao;
    constructor () {
        if (typeof MariaDBDao.instance === 'object') {
            consoleLogger.warn("ya existe el objeto")
            return MariaDBDao.instance;
        }
        MariaDBDao.instance = this;
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        try {
            consoleLogger.info('agregar por mariaDB')
            producto.timestamp = Date.now();
            await knexMariaDB("productos").insert(producto);
        }
        catch (error) {
            errorLogger.error(error);
            response = false;
        }
        return response;
    }

    async buscarProducto(id:any) {
        try {
            consoleLogger.info('buscar por mariaDB')
            const prod = await knexMariaDB.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            consoleLogger.info(`productos encontrados ${prod}`)
            return prod;
        }
        catch (error) {
            errorLogger.error(error);
        }
    }

    async listarProductos() {
        try {
            consoleLogger.info("listar productos por mariaDB")
            const rows = await knexMariaDB.from("productos")
            .select("*")
            return rows;
        } 
        catch (error) {
            errorLogger.error(error);
        }
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let response = false;
        try {
            let resul = await knexMariaDB.from("productos")
            .where("id", "=", parseInt(id))
            .del();
            
            if (resul) {
                response = true;
            }
        }
        catch (error){
            errorLogger.error(error);
        }
        return response;
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = false;
        try {
            const response = await knexMariaDB.from("productos").where("id","=",parseInt(id))
            .update(producto)
            consoleLogger.info(`producto actualizado ${response}`)
            if (response) {
                resultado = true;
            }
        }
        catch (error) {
            errorLogger.error(error);
        }
        return resultado;
    }

    async leerMensajes() {
        try {
            const rows = await knexMariaDB.from("mensajes")
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
            await knexMariaDB("mensajes").insert(mensaje);
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
            const prodAgregar = await knexMariaDB("productos").select("id").where("id", "=", parseInt(id));
            if (prodAgregar.length == 0){
                consoleLogger.info("producto no encontrado")
                response = false;
                return response;
            }
            //verifico si el producto ya existe en el carrito
            const prodCart = await knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id));
            if (prodCart.length > 0) {
                consoleLogger.info("el producto ingresado ya existe en el carrito");
                response = false;
                return response;
            }
            // verifico si existe el carrito
            let carritoID = await knexMariaDB("carrito").select("id");
            // si no existe el carrito lo creo
            if (carritoID.length == 0) {
                carritoID = await knexMariaDB("carrito").insert({timestamp: Date.now()}).returning('id');
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
            await knexMariaDB("productosCarrito").insert(producto)
        } catch (error){
            errorLogger.error(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        try {
            const productoCart = await knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id))
            if (productoCart.length == 0) {
                consoleLogger.warn("el producto no está en el carrito")
                return producto;
            } 
            producto = await knexMariaDB("productos").select("*").where("id", "=", parseInt(id))
            consoleLogger.info(`id producto encontrado ${producto}`)
            return producto;
        }
        catch (error) {
            errorLogger.error(error);
            return producto;
        }
    }; 
    
    async listarProdsCarrito() {
        let productosArray = [];
        try {
            consoleLogger.info("listar productos carrito por mariaDB")
            const rows = await knexMariaDB("productosCarrito").select("*")
            let results=JSON.parse(JSON.stringify(rows))
            let productoInsert
            for (const row of results) {
                let prods = await knexMariaDB("productos").select("*").where("id", "=", row.idProducto) 
                prods=JSON.parse(JSON.stringify(prods))
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
                }
                productosArray.push(productoInsert);
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
            const resp = await knexMariaDB.from("productosCarrito")
            .where("idProducto", "=", parseInt(id))
            .del();
            consoleLogger.info(`respuesta de borrar producto del carrito ${resp}`)
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
export default MariaDBDao;