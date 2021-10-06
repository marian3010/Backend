import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import options from '../../db/sqlite3';
import knex from "knex";
const knexSQLite3 = knex(options);

class Sqlite3Dao implements Operaciones {

    constructor() {
        knexSQLite3.schema.hasTable("productos")
        .then(response => {
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
           /* .update("title", title)
            .update("description", description)
            .update("price", price)
            .update("thumbnail", thumbnail)
            .update("stock", stock)
            .update("timestamp", Date.now())*/
            console.log("producto actualizado", response)
        }
        catch (error) {
            console.log(error);
            resultado = false;
        }
        return resultado;
    }
}
export default Sqlite3Dao;