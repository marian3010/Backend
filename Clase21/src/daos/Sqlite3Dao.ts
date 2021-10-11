import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/sqlite3';
import knex from "knex";
const knexSQLite3 = knex(options);

class Sqlite3Dao implements Operaciones {

    constructor() {
        knexSQLite3.schema.hasTable("productos")
        .then(response => {
            console.log("console log al crear tabla productos", response);
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
                .then(() => console.log("tabla productos creada en SQLite3"))
                .catch((error) => {
                  console.log(error);
                })
            }
        });
        knexSQLite3.schema.hasTable("mensajes")
        .then(res => {
            console.log("respuesta al crear tabla mensajes", res)
            if(!res) {
                knexSQLite3.schema.createTable("mensajes", (table:any) => {
                    table.string("author");
                    table.string("fecha");
                    table.string("text");
                })
                .then(() => console.log("tabla mensajes creada en SQLite3"))
                .catch((error) => {
                  console.log(error);
                })
            }
        });
    }

    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            console.log('agregar por SQLite3')
            const response = await knexSQLite3("productos").insert(producto);
            console.log("Id del producto agregado", response)
        }
        catch (error) {
            resultado = false;
            console.log(error);
        }
        return resultado;
    }

    async buscarProducto(id:any) {
        try {
            console.log('buscar por SQLite3')
            const producto = await knexSQLite3.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            console.log("productos encontrados", producto)
            return producto;
        }
        catch (error) {
            console.log(error);
        }
    }

    async listarProductos() {
        try {
            console.log("listar productos por SQLite3")
            const rows = await knexSQLite3.from("productos")
            .select("*")
            console.log("productos encontrados", rows)
            return rows;
        } 
        catch (error) {
            console.log(error)
        }
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = true;
        try {
            const response = await knexSQLite3.from("productos")
            .where("id", "=", parseInt(id))
            .del();
            console.log("respuesta del delete", response)
        }
        catch (error){
            console.log(error);
            resultado = false;
        }
        return resultado;
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = true;
        try {
            const response = await knexSQLite3.from("productos").where("id","=",parseInt(id))
            .update(producto)
            console.log("producto actualizado", response)
        }
        catch (error) {
            console.log(error);
            resultado = false;
        }
        return resultado;
    }

    async leerMensajes() {
        try {
            const rows = await knexSQLite3.from("mensajes")
            .select("*")
            console.log("mensajes encontrados", rows)
            return rows;
        }
        catch(error) {
             console.log(error);
        } 
    };   

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        try {
            console.log('agregar mensaje por mariaDB')
            await knexSQLite3("mensajes").insert(mensaje);
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
    };
}
export default Sqlite3Dao;